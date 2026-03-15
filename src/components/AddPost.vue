<script setup>
  import { useUserStore } from '@/Stores/StoreDashboard';

  let user = useUserStore();
  // проверка если обновили страницу нужно перекинуть на страницу авторизации
  if(user.name.length <= 0 || user.surname.length <= 0 || user.patronymic.length <= 0){
    router.push('/');
  }
  
</script>

<template>
  <main>
    <section class="content">
      
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

</style>
