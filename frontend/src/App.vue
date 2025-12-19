<script setup lang="ts">
  import { ref } from 'vue';
  import TopNav from './components/TopNav/TopNav.vue';
  import { RouterView } from 'vue-router';

  const greeting = ref("Hello World")
</script>

<template>
  <TopNav />
  <p class="greeting">{{ greeting }}</p>
  <RouterView />
</template>

<style scoped>
  .greeting {
    color: #fff;
    font-weight: 800;
  }
</style>
