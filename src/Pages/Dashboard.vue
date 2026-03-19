<script setup>
  import { useUserStore } from '@/Stores/StoreDashboard';
  import axios from 'axios';
  import { ref } from 'vue';
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

  // удаление поста
  let delPost = async (id) => {
    try{
      await axios.delete(`${user.postsURL}/${id}`);
      await AnyPosts();
    }catch(error){
      alert(error);
    }
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
</script>

<template>
  <main class="content">
    <section  v-if="!showPost">
      <section class="info">
        <h1 class="name">{{ name }} {{ surname }} {{ patronymic }}</h1>
        <div class="line"></div>

        <h1 v-if="onPosts.length <= 0" class="errorPost"> У вас пока нету постов </h1>

        <div class="post" v-for="post in onPosts" :key="post.id">
          <div @click="getInfoPost(post.id, post.idUser, post.title, post.description)">
            <h1 class="postTitle">{{ post.title }}</h1>
            <button class="delPost" @click.stop="delPost(post.id)">Удалить</button>
          </div>
        </div>
        
      </section>
      <router-view />
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

.post div{
  font-size: 2vh;
  border: 0.1vh solid #000;
  margin: 2vh;
  padding: 2vh;
  border-radius: 2vh;
  cursor: pointer;
  background-color: rgb(239, 255, 239);
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.delPost{
  border: none;
  background-color: rgb(245, 124, 124);
  color: #fff;
  font-size: 2.5vh;
  padding: 1vh;
  border-radius: 1vh;
  cursor: pointer;
}
</style>
