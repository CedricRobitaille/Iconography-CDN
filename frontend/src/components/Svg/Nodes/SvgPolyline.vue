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

</script>

<template>

  <polyline
    :points="pointsString"
    :fill="fill" 
    :stroke="stroke" 
  />

</template>

<style scoped></style>