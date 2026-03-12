<script setup lang="ts">
  import { computed } from 'vue';
  import type { treeNode, Polyline } from '../../../types';
  import { useEditorStore } from '../../../stores/editorSvg';

  interface Points {
    x: number;
    y: number;
  }

  const props = defineProps<{
    node: treeNode;
    editorMode?: boolean;
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


  const emitClick = (event: MouseEvent): void => {

    // stop click bubbling
    event.stopPropagation();

    // Only run this function IF we're in edit mode.
    if (props.editorMode) {
      const append = event.shiftKey ? true : false;
      useEditorStore().selectNode(props.node, append)
    }
  }

  const pointerEvent = computed(() => {
    let event = "none"
    console.log(fill)
    if (!(fill.value === "none" || fill.value === "" ) && !(stroke.value !== "none" || stroke.value === "")) {
      event = "all"
    } else if (stroke.value !== "none") {
      event = "stroke"
    }
    console.log(event)
    console.log("this")
    return event
  })


</script>

<template>

  <polyline
    :class="{ 'editorShape': editorMode }"
    :points="pointsString"
    :fill="fill" 
    :stroke="stroke" 
    :stroke-width="sWidth"
    :stroke-linecap="sLinecap"
    :stroke-linejoin="sLinejoin"
    :pointer-events="pointerEvent"
    @click.stop="emitClick"
  />

</template>

<style scoped></style>