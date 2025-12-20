<script setup lang="ts">
import FilterPanel from '../components/FilterPanel/FilterPanel.vue';


</script>

<template>

  <main>

    <FilterPanel />

    <section>
      <p>Library</p>
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
</style>