<script setup lang="ts">
  import Controls from './Controls/Controls.vue';
  import ActiveUser from '../../components/ActiveUser/ActiveUser.vue';
  import SearchBar from '../SearchBar/SearchBar.vue';
  import Layers from './Layers/Layers.vue';
</script>



<template>
  <section id="project">
    
    <Controls />
    <ActiveUser />
    <SearchBar placeholder="Layer"/>
    <Layers />
    
  </section>
</template>



<style scoped>
  #project {
    max-width: 18rem;
    width: 100%;
    background-color: var(--bg-20);
    height: 100%;
    overflow-y: hidden;
    display: grid;
    grid-template-rows: auto auto auto 1fr auto;
    border-right: .5px solid var(--border);
  }
</style>