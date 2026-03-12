<script setup>
  import { useRouter } from 'vue-router';

  const router = useRouter();
</script>

<template>
  <main>
    <header class="header"><h1>Snake</h1></header>
    <section class="content">
        <RouterView />
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
  background-color: rgb(55, 124, 55);
  font-size: 20px;
  position: fixed;
  width: 100%;
  top: 0px;
  left: 0px;
  height: 70px;
  border-radius: 0px 0px 10px 10px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  align-items: center;
} 
</style>
