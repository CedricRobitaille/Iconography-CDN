<script setup lang="ts">
  import { ref } from 'vue';
  import { useSvgParser } from '../../../composables/svgTranslator';
  import { useEditorStore } from '../../../stores/editorSvg';

  const icon = useEditorStore();

  const { parse } = useSvgParser();

  const svg = ref("")

  const handleSubmit = () => {
    icon.rootNode = parse(svg.value);
  }

</script>

<template>
  <div class="preview-container">
    <svg class="preview">

    </svg>
    <form @submit.prevent="handleSubmit">
      <textarea name="" id="" v-model="svg"></textarea>
      <button type="submit">convert</button>
    </form>
    
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