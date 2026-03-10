<script setup lang="ts">
  import { computed } from 'vue';
  import type { treeNode, Circle } from '../../../types';
  import { useEditorStore } from '../../../stores/editorSvg';

  const props = defineProps<{
    node: treeNode;
    editorMode?: boolean;
  }>();

  // ! Extract circle properties
  const circle = computed(() => {
    return props.node.properties as Circle
  })

  const fill = computed(() => props.node.style.fill);
  const stroke = computed(() => props.node.style.stroke);
  const sWidth = computed(() => props.node.style.strokeWidth);
  const sLinecap = computed(() => props.node.style.strokeLinecap);
  const sLinejoin = computed(() => props.node.style.strokeLinejoin);


    // Click handler
  const emitClick = (event: MouseEvent): void => {
    console.log("this")
    // stop click bubbling
    event.stopPropagation();

    // Only run this function IF we're in edit mode.
    if (props.editorMode) {
      const append = event.shiftKey ? true : false;
      useEditorStore().selectNode(props.node, append)
    }
  }

</script>

<template>
  
  <g>
    <circle 
      :cx="circle.cx"
      :cy="circle.cy"
      :r="circle.r"
      :fill="fill"
      :stroke="stroke"
      :stroke-width="sWidth"
      :stroke-linecap="sLinecap"
      :stroke-linejoin="sLinejoin"
      @click.stop="emitClick"
    />
  </g>

  

</template>

<style scoped>
  circle {
    pointer-events: all;
  }
</style>