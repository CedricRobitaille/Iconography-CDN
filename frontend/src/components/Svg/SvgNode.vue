<!-- Recursive Render -->

<script setup lang="ts">
  import { computed } from 'vue';
  import type { treeNode, svgDescriptor } from '../../types'; 

  import SvgCircle from './Nodes/SvgCircle.vue';
  import SvgGroup from './Nodes/SvgGroup.vue';
  import SvgRect from './Nodes/SvgRect.vue';

  const props = defineProps<{
    node: treeNode;
  }>();

  const isVisible = computed(() => props.node.visible)
</script>

<template>
  <!-- Only display node if node is visible -->
  <template v-if="isVisible">

    <!-- Folder / Group -->
    <SvgGroup v-if="node.type === 'folder'" :node="node" />

    <!-- Shapes -->
    <SvgCircle v-if="node.type === 'circle'" :node="node" />
    <SvgRect v-if="node.type === 'rect'" :node="node" />
    <!-- < v-if="node.type === ''" :node="node" /> -->

  </template>
</template>

<style scoped>

</style>