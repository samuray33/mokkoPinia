<script setup>
  import { useUserStore } from '@/Stores/StoreDashboard';
  import { useRouter } from 'vue-router';
  import axios from 'axios';
  import { ref } from 'vue';

  let router = useRouter();

  let user = useUserStore();
  // проверка если обновили страницу нужно перекинуть на страницу авторизации
  if(user.name.length <= 0 || user.surname.length <= 0 || user.patronymic.length <= 0){
    router.push('/');
  }

  // сохраняем переменные для дальнейшего добавление в пост
  let onAddPost = ref({
    idUser: user.$id,
    title: "",
    description: ""
  });

  // достаем посты наши
  let AddPosts = async() => {
    try{
      // волидация
      if(onAddPost.value.title.length <= 0 || onAddPost.value.description.length <= 0){
        alert("Не все поля заполнены");
        return;
      }
      let res = await axios.post(user.postsURL, {
        idUser: onAddPost.value.idUser,
        title: onAddPost.value.title,
        description: onAddPost.value.description
      });
      router.push('/Posts');
    }catch(error){
      alert(error);
    }
  }

</script>

<template>
  <main class="content">
    <section>
      <h1>Название</h1>
      <input v-model="onAddPost.title" class="namePost" type="text">

      <h1>Содержание</h1>
      <textarea v-model="onAddPost.description" class="descriptionPost"></textarea>

      <button @click="AddPosts">Добавить</button>
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
}

section h1{
  font-size: 4vh;
  margin-top: 4vh ;
}
.namePost{
  width: 135vh;
  outline: none;
  padding: 2vh;
  font-size: 3vh;
  border-radius: 2vh;
  border: 0.1vh solid #000;
}
.descriptionPost{
  width: 135vh;
  height: 45vh;
  padding: 2vh;
  resize: none;
  border-radius: 2vh;
  outline: none;
  font-size: 3vh;
  border: 0.1vh solid #000;
}
section button{
  width: 30vh;
  margin-left: 55vh;
  margin-top: 4vh;
  padding: 2vh 3vh;
  background-color: forestgreen;
  border: none;
  border-radius: 2vh;
  color: #fff;
  cursor: pointer;
  font-size: 2.5vh;
}
</style>
