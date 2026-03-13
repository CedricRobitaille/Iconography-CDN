<script setup lang="ts">
  import { ref } from 'vue';
  import { useEditorStore } from '../../../stores/editorSvg';
  import type { treeNode } from '../../../types';
  import { parseSvgToTreeNode } from '../../../composables/svg/parseSvgToNodeTree';

  const canvas = useEditorStore();
  const svg = ref<treeNode | any>("")

  const handleSubmit = () => {
    canvas.rootNode = parseSvgToTreeNode(svg.value);
  }
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <textarea name="" id="" v-model="svg"></textarea>
    <button type="submit">Insert SVG</button>
  </form>
</template>


<style scoped>
  form {
    display: flex;
    flex-direction: column;
    gap: .75rem;
  }

  button {
    padding: .5rem;
    background-color: var(--bg-30);
    border-radius: .5rem;
    border: 1px solid var(--border);
    transition: .125s;
  }

  button:hover {
    background-color: var(--bg);
  }
</style>