<script setup lang="ts">
import PanelContainer from '../PanelContainer/PanelContainer.vue';
import Preview from './Preview/Preview.vue';



</script>

<template>
  <section id="properties">

    <PanelContainer :component="Preview" title="Preview"/>

  </section>
</template>

<style scoped>
  #properties {
    max-width: 18rem;
    width: 100%;
    background-color: var(--bg-20);
    height: 100%;
    overflow-y: auto;
    display: flex;
    flex-direction: row;
    border-left: .5px solid var(--border);
  }

</style>