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
  const sWidth = computed(() => props.node.style.strokeWidth);
  const sLinecap = computed(() => props.node.style.strokeLinecap);
  const sLinejoin = computed(() => props.node.style.strokeLinejoin);

</script>

<template>

  <ellipse 
    :cx="ellipse.cx"
    :cy="ellipse.cy"
    :rx="ellipse.rx"
    :ry="ellipse.ry"
    :fill="fill" 
    :stroke="stroke" 
    :stroke-width="sWidth"
    :stroke-linecap="sLinecap"
    :stroke-linejoin="sLinejoin"
  />

</template>

<style scoped></style>