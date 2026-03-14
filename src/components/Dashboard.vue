<script setup>
  import { useRouter } from 'vue-router';

  const router = useRouter();
</script>

<template>
  <main>
    <section class="content">
      <section class="info">
        <h1 class="name">Фамилия Имя Отчество</h1>
        <div class="line"></div>
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
  margin-left: 10vh;
}
.name{
  padding: 0vh 0vh 1vh 3vh; 
}
.line{
  border-bottom: 1px solid #000;
}
</style>
