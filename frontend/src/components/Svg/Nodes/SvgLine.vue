<script setup lang="ts">
  import { computed } from 'vue';
  import type { treeNode, Line } from '../../../types';

  const props = defineProps<{
    node: treeNode;
    editorMode?: boolean;
  }>();

  // ! Extract shape properties
  const line = computed<Line>(() => {
    return props.node.properties as Line;
  })

  // We are not including fills since lines don't really do that...
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

  <line 
    :x1="line.x1"
    :y1="line.y1"
    :x2="line.x2"
    :y2="line.y2"
    fill="none" 
    :stroke="stroke" 
    :stroke-width="sWidth"
    :stroke-linecap="sLinecap"
    :stroke-linejoin="sLinejoin"
    @click.stop="emitClick"
  />

</template>

<style scoped></style>