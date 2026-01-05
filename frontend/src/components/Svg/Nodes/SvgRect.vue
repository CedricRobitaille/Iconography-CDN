<script setup lang="ts">
  import { computed } from 'vue';
  import type { treeNode, Rectangle } from '../../../types';

  const props = defineProps<{
    node: treeNode;
  }>();

  // ! Extract shape properties
  const rect = computed<Rectangle>(() => {
    return props.node.properties as Rectangle
  })

  const fill = computed(() => props.node.style.fill);
  const stroke = computed(() => props.node.style.stroke);
  const sWidth = computed(() => props.node.style.strokeWidth);
  const sLinecap = computed(() => props.node.style.strokeLinecap);
  const sLinejoin = computed(() => props.node.style.strokeLinejoin);

</script>

<template>

  <rect 
    :x="rect.x"
    :y="rect.y"
    :width="rect.w"
    :height="rect.h"
    :rx="rect.rx"
    :ry="rect.ry" 
    :fill="fill" 
    :stroke="stroke"
    :stroke-width="sWidth"
    :stroke-linecap="sLinecap"
    :stroke-linejoin="sLinejoin"
  />

</template>

<style scoped></style>