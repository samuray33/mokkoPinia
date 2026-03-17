<script setup>
  import { useUserStore } from '@/Stores/StoreDashboard';
  import { ref } from 'vue';
  import axios from 'axios';
  import { useRouter } from 'vue-router';

  let router = useRouter();
  let user = useUserStore();
  
  // проверка если обновили страницу нужно перекинуть на страницу авторизации
  if(user.name.length <= 0 || user.surname.length <= 0 || user.patronymic.length <= 0){
    router.push('/');
  }

  // проверяем есть посты
  let onPosts = ref([]);
  let AnyPosts = async() => {
    try{
      let response = await axios.get(user.postsURL);
      let postsData = response.data;
      onPosts.value = postsData;
    }catch(error){
      alert(error);
    }
  }
  AnyPosts();
</script>

<template>
  <main>
    <section class="content">
      <h1 class="header">Посты</h1>

      <div class="line"></div>

      <h1 v-if="onPosts.length <= 0" class="errorPost"> У вас пока нету постов </h1>

      <div class="post" v-for="post in onPosts" :key="post.id">
          <h1 class="postTitle">{{ post.title }}</h1>
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
}

.line{
  border-bottom: 1px solid #000;
}
.errorPost{
  font-size: 3vh;
}
.header{
  font-size: 5vh;
  margin-left: 3vh;
}
.post{
  font-size: 2vh;
  border: 0.1vh solid #000;
  margin: 2vh;
  padding: 2vh;
  border-radius: 2vh;
  cursor: pointer;
  background-color: rgb(239, 255, 239);
}
</style>
