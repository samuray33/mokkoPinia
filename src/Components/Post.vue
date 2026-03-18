<script setup>
  import { useUserStore } from '@/Stores/StoreDashboard';
  import axios from 'axios';
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';

  let router = useRouter();
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

  // выявляем автора

  let autor = ref('');
  let getAutor = async() => {
    let res = await axios.get(user.usersURL);
    let resData = res.data;

    const foundUser = resData.find((item) => item.id == props.propsIdUser);
    autor.value = foundUser;

  }
  getAutor();
</script>

<template>
  <main class="content">
    <h1 class="post">Пост: {{ props.propsTitle }}</h1>
    <h1 class="DescriptionName">Описание: {{ props.propsDescription }}</h1>

    <h3 class="autor"> Автор: {{ autor.name }}</h3>
    <button @click="ShowFalse">Готово</button>
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
</style>
