<script setup>
  import { useRouter } from 'vue-router';
  import { ref } from 'vue';

  const router = useRouter();

  let aside = ref(false);
</script>

<template>
  <header class="header"><h1>Snake</h1></header>
  <div class="main">
    <aside v-if="aside">
      <h1>Панель навигации</h1>
      <div class="navigation">
        <h3>Личный кабинет</h3>
        <h3>Добавить пост</h3>
        <h3>Посты</h3>
        <h3>Выйте из аккаунта</h3>
      </div>
    </aside>
  
    <section class="content">
      <router-view />
    </section>
  </div>
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
.main{
  display: flex;
  flex-direction: row;
}

.header{
  background-color: rgb(55, 124, 55);
  font-size: 3vh;
  position: fixed;
  width: 100%;
  top: 0px;
  left: 0px;
  height: 10vh;
  border-radius: 0px 0px 10px 10px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  align-items: center;
}

aside{
  margin-top: 11vh;
  border: 1px solid forestgreen;
  width: 40vh;
  height: 80vh;
  font-size: 2.3vh;
  padding: 2vh;
  border-radius: 10px;
  background-color: rgb(239, 255, 239);
}
.navigation{
  margin-top: 2vh;
}
.navigation h3{
  margin-top: 1vh;
  cursor: pointer;
  border: 1px solid #000;
  padding: 1vh 2vh;
  border-radius: 10px;
  font-size: 3vh;
  transition: 0.3s all;
}
.navigation h3:hover{
  transition: 0.3s all;
  color: #fff;
  background-color: forestgreen;
  box-shadow: 0px 0px 10px forestgreen;
  border: 1px solid forestgreen;
}
</style>
