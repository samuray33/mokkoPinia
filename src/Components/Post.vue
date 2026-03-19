<script setup>
  import { useUserStore } from '@/Stores/StoreDashboard';
  import axios from 'axios';
  import { ref, onMounted, reactive } from 'vue';

  let user = useUserStore();

  // тут пропсы получаем
  let props = defineProps({ 
    propsId: String,
    propsIdUser: String,
    propsTitle: String,
    propsDescription: String,
    showPost: Boolean
  });

  // тут емит отправляем
  let emits = defineEmits(['showPost'])
  
  // уходим
  let showPost = false;
  let ShowFalse = () => {
    emits('showPost', showPost)
  }

  // выводим коменты к посту
  let comments = ref([]);
  let commentURL = async() => {
    try{
      let res = await axios.get(user.commentsURL);
      let resData = res.data;
      
      let filtCom = resData.filter((com) => com.idPost == props.propsId);
      comments.value = filtCom.reverse();
    }catch(error){
      alert(error);
    }
  }

  // выявляем автора поста // выявляем автора комента
  let autor = ref('');
  
  let getAutor = async() => {
  try {
    let res = await axios.get(user.usersURL);
    let resData = res.data;

    // Автор поста
    const foundUser = resData.find((item) => item.id == props.propsIdUser);
    autor.value = foundUser;

    // Авторы комментариев 
    if (comments.value.length > 0) {
      comments.value.forEach(com => {
        const author = resData.find((item) => item.id == com.idUser);
        // можно добавить автора прямо в объект комментария ****************************
        com.author = author || null;
      });
    }
  } catch(error) {
    alert(error);
  }
}

  // Запускаем загрузку при монтировании компонента
  onMounted(async() => {
    await commentURL();
    await getAutor();
  });


  // добавляем коментарий 
  let AddCom = ref({
    idUser: user.$id,
    idPost: props.propsId,
    comment: "",
  });
  let addCom = async() => {
    try{
      if(AddCom.value.comment.length <= 0){
        alert("комент не написан");
        return;
      }
      await axios.post(user.commentsURL, {
        idUser: AddCom.value.idUser,
        idPost: AddCom.value.idPost,
        comment: AddCom.value.comment
      });
      AddCom.value.comment = "";
      await commentURL(); 
      await getAutor()
      
    }catch(error){
      alert(error);
    }
  }
</script>

<template>
  <main class="content">
    <section>
      <h1 class="post">Пост: {{ props.propsTitle }}</h1>
      <h1 class="DescriptionName">Содержание: {{ props.propsDescription }}</h1>
    </section>
    
    <section>
      <h3 class="autor"> Автор: {{ autor.name }}</h3>
      <button @click="ShowFalse">Готово</button>
    </section>
    
    <section>
      <h1>Написать коментарий</h1>
      <div class="AddCom">
        <textarea v-model="AddCom.comment" class="TextAddCom"></textarea>
        <button class="AddCom" @click="addCom">Добавить коментарий</button>
      </div>
    </section>

    <section>
      <h1>Коментарии: </h1>
      <h1 class="noCom" v-if="comments.length == 0">Пока нету коментарии</h1>
      <div class="comment" v-for="comment in comments" :key="comment.id">
        <h1 class="Avtor">Автор: {{ comment.author?.name || 'Неизвестный' }}</h1>
        <h1> {{ comment.comment }} </h1>
      </div>
    </section>
    
  </main>
</template>

<style scoped>
*{
  margin: 0;
  padding: 0;
}

.content{
  margin: 0;
  width: 140vh;
  margin-top: 11vh;
  font-size: 2.5vh;
  overflow-wrap: break-word; 
}
.post{
  border-bottom: 0.1vh solid #000;
  padding: 1vh 0vh 5vh 0vh;
  text-align: center;
}

.DescriptionName{
  padding: 2vh 0vh 5vh 0vh;
  border-bottom: 0.1vh solid #000;
}

button{
  border: none;
  background-color: green;
  color: #fff;
  font-size: 2.5vh;
  padding: 1.5vh 10vh;
  border-radius: 1vh;
  cursor: pointer;
  margin-top: 6vh;
  margin-left: 60vh;
}

.TextAddCom{
  width: 135vh;
  height: 20vh;
  padding: 2vh;
  resize: none;
  border-radius: 2vh;
  outline: none;
  font-size: 3vh;
  border: 0.1vh solid #000;
}

.noCom{
  background-color: rgb(116, 30, 30);
  color: #fff;
  text-align: center;
  border-radius: 1vh;
  margin-bottom: 3vh;
}
.comment{
  margin: 3vh 0vh;
  border: 0.1vh solid #000;
  padding: 1ch 2vh;
  border-radius: 1vh;
  background-color: rgb(239, 255, 239);
}
.Avtor{
  font-size: 3vh;
}
</style>
