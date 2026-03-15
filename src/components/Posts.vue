<script setup>
  import { useUserStore } from '@/Stores/StoreDashboard';

  let user = useUserStore();
  
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
