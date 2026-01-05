<script setup lang="ts">
  import { useEditorStore } from '../../../stores/editorSvg';
  import IconSvg from '../../Svg/IconSvg.vue';

  const icon = useEditorStore();

</script>

<template>
  <div class="preview-container">
    <IconSvg 
      class="preview"
      :svg="icon.rootNode"
    />
  </div>
</template>

<style scoped>
  .preview-container {
    width: 100%;
    /* height: 10rem; */
    background-color: var(--bg-30);
    display: flex;
    padding: 1rem;
    border-radius: .5rem;
  }
  .preview {
    width: 100%;
    aspect-ratio: 1/1;
    margin: 0 auto;
    
  }
</style>