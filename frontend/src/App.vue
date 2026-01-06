<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import TopNav from './components/TopNav/TopNav.vue';
  import { RouterView } from 'vue-router';
  import { useCollectionStore } from './stores/collections';

  const collectionStore = useCollectionStore();

  onMounted(() => {
    collectionStore.fetchCollections();
  })
</script>

<template>
  <TopNav />
  <RouterView />
</template>

<style scoped>
</style>
