<script setup>
  import { useUserStore } from '@/Stores/StoreDashboard';
  import axios from 'axios';
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';

  let router = useRouter();

  let user = useUserStore();
  // проверка если обновили страницу нужно перекинуть на страницу авторизации
  if(user.name.length <= 0 || user.surname.length <= 0 || user.patronymic.length <= 0){
    router.push('/');
  }

  // проверяем есть ли у пользователя посты
  let onPosts = ref([]);
  let AnyPosts = async() => {
    try{
      let response = await axios.get(user.postsURL);
      let postsData = response.data;

      // если есть посты у него то перекидывает это выше 
      let posts = postsData.filter((post) => post.idUser == user.$id);
      onPosts.value = posts;
    }catch(error){
      alert(error);
    }
  }
  AnyPosts();

  // присвоение значений из model в store
  let name = user.name;
  let surname = user.surname;
  let patronymic = user.patronymic;
</script>

<template>
  <main>
    <section class="content">
      <section class="info">
        <h1 class="name">{{ name }} {{ surname }} {{ patronymic }}</h1>
        <div class="line"></div>

        <h1 v-if="onPosts.length <= 0" class="errorPost"> У вас пока нету постов </h1>

        <div class="post" v-for="post in onPosts" :key="post.id">
          <h1 class="postTitle">{{ post.title }}</h1>
        </div>
        
      </section>
      <router-view />
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
.name{
  padding: 0vh 0vh 1vh 3vh; 
  font-size: 5vh;
}
.line{
  border-bottom: 1px solid #000;
}

.errorPost{
  font-size: 3vh;
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
