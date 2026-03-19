<script setup>
  import { useUserStore } from '@/Stores/StoreDashboard';
  import { ref } from 'vue';
  import axios from 'axios';
  import { useRouter } from 'vue-router';
  import Post from '@/Components/Post.vue';

  let showPost = ref(false);
  let showPostBool = (data) => {
    showPost.value = data;
  }

  let router = useRouter();
  let user = useUserStore();
  
  // проверка если обновили страницу нужно перекинуть на страницу авторизации
  if(user.name.length <= 0 || user.surname.length <= 0 || user.patronymic.length <= 0){
    router.push('/');
  }

  // данные для пропсов
  let propsId = ref("");
  let propsIdUser = ref("");
  let propsTitle = ref("");
  let propsDescription = ref("");
  // открытие поста
  let getInfoPost = (id, idUser, title, description) => {
    propsId.value = id;
    propsIdUser.value = idUser;
    propsTitle.value = title;
    propsDescription = description;

    showPost.value = true;
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
  <main class="content">
    <section v-if="!showPost">
      <h1 class="header">Посты</h1>

      <div class="line"></div>

      <h1 v-if="onPosts.length <= 0" class="errorPost"> Пока нету постов </h1>

      <div  class="post" v-for="post in onPosts" :key="post.id">
        <div @click="getInfoPost(post.id, post.idUser, post.title, post.description)">
          <h1 class="postTitle">{{ post.title }}</h1>
        </div>
      </div>
    </section>
    <section v-if="showPost">
      <post :propsId :propsIdUser :propsTitle :propsDescription :showPost @show-post="showPostBool"/>
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
  overflow-wrap: break-word; 
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
