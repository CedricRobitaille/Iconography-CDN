<script setup lang="ts">
  import { computed } from 'vue';
  import type { treeNode, Polygon } from '../../../types';

  interface Points {
    x: number;
    y: number;
  }

  const props = defineProps<{
    node: treeNode;
  }>();

  // ! Extract shape properties
  const polygon = computed<Polygon>(() => {
    return props.node.properties as Polygon
  });

  // Convert points array to SVG points string
  const pointsString = computed(() => {
    // Points come in as [[x,y],[x,y],[x,y]]
    // Convert to ["x,y","x,y", "x,y"]
    // Join to "x,y x,y x,y"
    return polygon.value.points
      .map((pt: Points) => `${pt.x},${pt.y}`)
      .join(' ')
  })

  const fill = computed(() => props.node.style.fill);
  const stroke = computed(() => props.node.style.stroke);

</script>

<template>

  <polygon 
    :points="pointsString"
    :fill="fill" 
    :stroke="stroke" 
  />

</template>

<style scoped></style>