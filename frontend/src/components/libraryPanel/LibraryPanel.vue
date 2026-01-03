<script setup lang="ts">
  import { onMounted } from 'vue';
  import { useLibraryResultsStore } from '../../stores/libraryResults';

  const libraryStore = useLibraryResultsStore();

  onMounted(() => { 
    libraryStore.fetchLibrary();
    console.log(libraryStore.libraryResults)
  })

</script>

<template>
  <h1>Library</h1>
  <ul>
    <li 
      v-for="icon in libraryStore.libraryResults"
      :key="icon.id"
      >
      <p>{{ icon.name }}</p>
    </li>
  </ul>
</template>

<style scoped>

</style>