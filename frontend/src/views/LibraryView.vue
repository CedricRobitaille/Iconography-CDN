<script setup lang="ts">
import FilterPanel from '../components/FilterPanel/FilterPanel.vue';
import LibraryPanel from '../components/libraryPanel/LibraryPanel.vue';


</script>

<template>

  <main>

    <FilterPanel />

    <section class="library">
      <LibraryPanel />
    </section>
  </main>

</template>

<style scoped>
  main {
    display: grid;
    grid-template-columns: minmax(100px, 18rem) 1fr;
    height: 100%;
    overflow: hidden;
  }

  .library {
    display: grid;
    grid-template-rows: auto auto 1fr;
    gap: 1rem;
    height: 100%;
    max-width: 75rem;
    width: 100%;
    padding: 2rem;
    margin: 0 auto;
    padding-bottom: 5rem;
  }
  
</style>