<script setup lang="ts">
  import { computed } from 'vue';
  import type { treeNode, Ellipse } from '../../../types';

  const props = defineProps<{
    node: treeNode;
  }>();

  // ! Extract shape properties
  const ellipse = computed<Ellipse>(() => {
    return props.node.properties as Ellipse
  })

  const fill = computed(() => props.node.style.fill);
  const stroke = computed(() => props.node.style.stroke);

</script>

<template>

  <ellipse 
    :cx="ellipse.cx"
    :cy="ellipse.cy"
    :rx="ellipse.rx"
    :ry="ellipse.ry"
    :fill="fill" 
    :stroke="stroke" 
  />

</template>

<style scoped></style>