<script setup lang="ts">

import { reactive, ref } from 'vue';
import EditorCanvas from '../components/Editor/EditorCanvas.vue';
import ProjectPanel from '../components/ProjectPanel/ProjectPanel.vue';
import PropertiesPanel from '../components/PropertiesPanel/PropertiesPanel.vue';


/**
 * Handle's space press in editor view to display hand
 */
const moveState = reactive({
  isSpaceDown: false,
  isDragging: false
});


</script>

<template>
  <main
    @keydown.space="moveState.isSpaceDown = true"
    @keyup.space="moveState.isSpaceDown = false"
    :class="{ 'space-down' : moveState.isSpaceDown }"
  >

    <!-- Left Modal -->
    <ProjectPanel />

    <!-- Main Artboard -->
    <section 
      id="artboard" 
      @mousedown="moveState.isDragging = true"
      @mouseup="moveState.isDragging = false"
      @mouseout="moveState.isDragging = false"
      :class="{ 'is-dragging' : moveState.isDragging }"
    >
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
    height: calc(100vh - 1.5rem);
    overflow: hidden;
  }

  .space-down #artboard {
    cursor: grab;
  }

  .space-down .is-dragging {
    cursor: grabbing !important;
  }
  
</style>