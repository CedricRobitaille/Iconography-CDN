<script setup lang="ts">

import EditorCanvas from '../components/Editor/EditorCanvas.vue';
import ProjectPanel from '../components/ProjectPanel/ProjectPanel.vue';
import PropertiesPanel from '../components/PropertiesPanel/PropertiesPanel.vue';

</script>

<template>
  <main>

    <!-- Left Modal -->
    <ProjectPanel />

    <!-- Main Artboard -->
    <section id="artboard">
    <EditorCanvas />
    </section>

    <!-- Right Modal -->
    <PropertiesPanel />

  </main>

</template>

<style scoped>
  main {
    display: grid;
    grid-template-columns: minmax(100px, 18rem) 1fr minmax(100px, 18rem);
    height: 100%;
    overflow: hidden;
  }
</style>