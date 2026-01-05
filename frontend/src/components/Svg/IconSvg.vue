<!-- Root SVG Wrapper -->

<script setup lang="ts">
  import { computed } from 'vue';
  import type { treeNode } from '../../types'; 
  import SvgNode from './SvgNode.vue';

  const props = defineProps<{
    nodes: treeNode[];
    viewBox?: string;
    editorMode?: boolean;
    onNodeClick?: (node: treeNode) => void;
  }>();

  // Only render visible nodes.
  // Rather than creating the node, than checking for visibility, we catch it before even attempting to render.
  const visibleNodes = computed(() => {
    console.log(props.nodes?.filter(n => n.visible) ?? [])
    return props.nodes?.filter(n => n.visible) ?? []
  });

</script>

<template>
  <svg 
    xmlns="http://www.w3.org/2000/svg"
    :viewBox="viewBox ?? '0 0 24 24'"
    class="rootSVG"
  >
    <SvgNode 
      v-for="node in visibleNodes"
      :key="node.id"
      :node="node"
      :editorMode="props.editorMode"
      :onNodeClick="props.onNodeClick"
    />
  </svg>
</template>

<style scoped>
  .rootSVG {
    fill: none;
  }
</style>