<script setup lang="ts">
  import { computed } from 'vue';
  import type { treeNode, Polygon } from '../../../types';

  interface Points {
    x: number;
    y: number;
  }

  const props = defineProps<{
    node: treeNode;
    editorMode?: boolean;
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
  const sWidth = computed(() => props.node.style.strokeWidth);
  const sLinecap = computed(() => props.node.style.strokeLinecap);
  const sLinejoin = computed(() => props.node.style.strokeLinejoin);

  const emitClick = (event: MouseEvent): void => {
    
    // stop click bubbling
    event.stopPropagation();

    // Only run this function IF we're in edit mode.
    if (props.editorMode) {
      console.log(props.node)
    }
  }

</script>

<template>

  <polygon 
    :points="pointsString"
    :fill="fill" 
    :stroke="stroke" 
    :stroke-width="sWidth"
    :stroke-linecap="sLinecap"
    :stroke-linejoin="sLinejoin"
    @click.stop="emitClick"
  />

</template>

<style scoped></style>