<script setup lang="ts">
  import { computed } from 'vue';
  import type { treeNode, Line } from '../../../types';

  const props = defineProps<{
    node: treeNode;
  }>();

  // ! Extract shape properties
  const line = computed<Line>(() => {
    return props.node.properties as Line
  })

  // We are not including fills since lines don't really do that...
  const stroke = computed(() => props.node.style.stroke);

</script>

<template>

  <ellipse 
    :x1="line.x1"
    :y1="line.y1"
    :x2="line.x2"
    :y2="line.y2"
    fill="none" 
    :stroke="stroke" 
  />

</template>

<style scoped></style>