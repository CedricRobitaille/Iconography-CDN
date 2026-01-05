<script setup lang="ts">
  import { computed } from 'vue';
  import type { treeNode, Circle } from '../../../types';

  const props = defineProps<{
    node: treeNode;
  }>();

  // ! Extract circle properties
  const circle = computed(() => {
    return props.node.properties as Circle
  })

  const fill = computed(() => props.node.style.fill);
  const stroke = computed(() => props.node.style.stroke);

</script>

<template>

  <circle 
    :cx="circle.cx"
    :cy="circle.cy"
    :r="circle.r"
    :fill="fill"
    :stroke="stroke"
  />

</template>

<style scoped></style>