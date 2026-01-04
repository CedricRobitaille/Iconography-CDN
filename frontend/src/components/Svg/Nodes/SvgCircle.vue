<script setup lang="ts">
  import { computed } from 'vue';
  import type { treeNode, Circle } from '../../../types';

  const props = defineProps<{
    node: treeNode;
  }>();

  // ! Extract circle properties
  const circle = computed<Circle>(() => {
    return props.node.properties as Circle
  })
</script>

<template>

  <circle 
    :cx="circle.cx"
    :cy="circle.cy"
    :r="circle.r"
    :fill="node.style.fill"
    :stroke="node.style.stroke"
  />

</template>

<style scoped></style>