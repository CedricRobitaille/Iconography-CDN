<script setup lang="ts">
  import SvgNode from '../SvgNode.vue';
  import type { treeNode } from '../../../types';

  const props = defineProps<{
    node: treeNode;
  }>();

</script>

<template>
  <g>
    <SvgNode
      v-for="child in node.children"
      :key = child.id
      :node="child"
    />
  </g>
</template>

<style scoped></style>