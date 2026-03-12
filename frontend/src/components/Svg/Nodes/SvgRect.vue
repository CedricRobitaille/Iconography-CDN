<script setup lang="ts">
  import { computed } from 'vue';
  import type { treeNode, Rectangle } from '../../../types';
  import { useEditorStore } from '../../../stores/editorSvg';

  const props = defineProps<{
    node: treeNode;
    editorMode?: boolean;
    keyLine?: boolean;
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

  const emitClick = (event: MouseEvent): void => {
    
    // stop click bubbling
    event.stopPropagation();

    // Only run this function IF we're in edit mode.
    if (props.editorMode) {
      const append = event.shiftKey ? true : false;
      useEditorStore().selectNode(props.node, append)
    }
  }

  /**
   * ! SET POINTER EVENTS BASED ON FILL/STROKE STATE
   * ! OBSOLETE IF VISIBLEPAINTED WORKS
   */
  // const pointerEvent = computed(() => {
  //   let event = "none"
  //   console.log(fill)
  //   if (!(fill.value === "none" || fill.value === "" ) && !(stroke.value !== "none" || stroke.value === "")) {
  //     event = "all"
  //   } else if (stroke.value !== "none") {
  //     event = "stroke"
  //   }
  //   console.log(event)
  //   console.log("this")
  //   return event
  // })

  console.log(props.keyLine)

</script>

<template>

  <rect 
    :class="{ 'editorShape': editorMode }"
    :x="rect.x"
    :y="rect.y"
    :width="rect.w"
    :height="rect.h"
    :rx="rect.rx"
    :ry="rect.ry" 
    :fill="fill" 
    :stroke="keyLine ? `cyan` : stroke"
    :stroke-width="keyLine ? .5 : sWidth"
    :stroke-linecap="sLinecap"
    :stroke-linejoin="sLinejoin"
    :vector-effect="keyLine ? 'non-scaling-stroke' : 'none'"
    @click.stop="emitClick"
  />

</template>

<style scoped>

</style>