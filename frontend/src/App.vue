<script setup lang="ts">
  import { ref } from 'vue';
  import TopNav from './components/TopNav/TopNav.vue';
  import { RouterView } from 'vue-router';
</script>

<template>
  <TopNav />
  <RouterView />
</template>

<style scoped>
</style>
