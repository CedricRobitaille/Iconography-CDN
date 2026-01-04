<!-- Root SVG Wrapper -->

<script setup lang="ts">
  import { computed } from 'vue';
  import type { treeNode } from '../../types'; 
  import SvgNode from './SvgNode.vue';

  defineProps<{
    nodes: treeNode[];
    viewBox?: string;
  }>();

</script>

<template>
  <svg 
    xmlns="http://www.w3.org/2000/svg"
    :viewBox="viewBox ?? '0 0 32 32'"
    class="rootSVG"
  >
    <SvgNode 
      v-for="node in nodes"
      :key="node.id"
      :node="node"
    />
  </svg>
</template>

<style scoped>
  .rootSVG {
    fill: none;
  }
</style>