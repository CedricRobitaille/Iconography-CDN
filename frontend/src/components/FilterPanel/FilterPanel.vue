<script setup lang="ts">
import ActiveUser from '../ActiveUser/ActiveUser.vue';
import SearchBar from '../SearchBar/SearchBar.vue';


</script>

<template>
  <section id="filter-panel">
    <ActiveUser />
    <SearchBar placeholder="Icon Name" />
  </section>
  
</template>

<style scoped>
  #filter-panel {
    background-color: var(--bg-20);
    border-right: .5px solid var(--border)
  }
</style>