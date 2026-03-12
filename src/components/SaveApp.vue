<script setup>
import axios from 'axios';
import { onMounted, reactive, ref } from 'vue';

// получение данных из нашего апи
let posts = ref();
let getData = async () => {
  try{
    let res = await axios.get('http://localhost:3000/posts');
    if(res.status === 200){
      posts.value = res.data;
      console.log(posts.value);
    }
  }catch(error){
    console.error("данные из апи не получилось достать", error);
  }
}
onMounted(() => {
  getData();
})


// добавление данных 
let OnAddPost = reactive({
  title: "",
  description: ""
});
let addPost = async () => {
  try{
    if(OnAddPost.title.length > 0 && OnAddPost.description.length > 0){
      let addpost = await axios.post('http://localhost:3000/posts', {
        title: OnAddPost.title,
        description: OnAddPost.description
      });
      OnAddPost.title = "";
      OnAddPost.description = "";
      await getData();
    }else{
      alert("Не все поля заполнены");
    }
  }catch(error){
    console.error("не получилось добавить данные", error)
  }
}

// для кнопки при нажатии вывести этот обьект
let getTitle = (index) => {
  console.log(posts.value[index]);
}

</script>

<template>
  <main class="content">
    <header class="header">Mokko&Pinia</header>
    <div class="form">
      <input type="text" v-model="OnAddPost.title" placeholder="title">
      <input type="text" v-model="OnAddPost.description" placeholder="description">
      <button @click="addPost">добавить</button>
    </div>
    
    <section>
      <h1 class="header">Тут данные из моего MOKKO-API</h1>
      <div class="posts" v-for="(post, index) in posts" :key="post.id">
        <h1>Title: {{ post.title }}</h1>
        <h1>Description: {{ post.description }}</h1>
        <button @click="getTitle(index)">Получить Title</button>
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
	margin: 0 auto;
  max-width: 1305px;
}

.header{
  text-align: center;
  font-size: 30px;
}

.form{
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 100%;
}
.form input{
  width: 50%;
  height: 30px;
  margin: 5px;
  font-size: 20px;
  border-radius: 100px;
  padding: 5px 10px;
  border: 1px solid #000;
}
.form button{
  width: 20%;
  padding: 10px 0px;
  border-radius: 100px;
  border: 1px solid #000;
  cursor: pointer;
}

.posts{
  border: 1px solid #000;
  padding: 10px 20px;
  margin: 10px;
  border-radius: 10px;
  transition: 0.3s all;
}
.posts:hover{
  background-color: #000;
  color: #fff;
  transition: 0.3s all;
}
</style>
