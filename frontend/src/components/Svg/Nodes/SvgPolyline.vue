<script setup lang="ts">
  import { computed } from 'vue';
  import type { treeNode, Polyline } from '../../../types';

  interface Points {
    x: number;
    y: number;
  }

  const props = defineProps<{
    node: treeNode;
  }>();

  // ! Extract shape properties
  const polyline = computed<Polyline>(() => {
    return props.node.properties as Polyline
  });

  // Convert points array to SVG points string
  const pointsString = computed(() => {
    // Points come in as [[x,y],[x,y],[x,y]]
    // Convert to ["x,y","x,y", "x,y"]
    // Join to "x,y x,y x,y"
    return polyline.value.points
      .map((pt: Points) => `${pt.x},${pt.y}`)
      .join(' ')
  })

  const fill = computed(() => props.node.style.fill);
  const stroke = computed(() => props.node.style.stroke);
  const sWidth = computed(() => props.node.style.strokeWidth);
  const sLinecap = computed(() => props.node.style.strokeLinecap);
  const sLinejoin = computed(() => props.node.style.strokeLinejoin);

</script>

<template>

  <polyline
    :points="pointsString"
    :fill="fill" 
    :stroke="stroke" 
    :stroke-width="sWidth"
    :stroke-linecap="sLinecap"
    :stroke-linejoin="sLinejoin"
  />

</template>

<style scoped></style>