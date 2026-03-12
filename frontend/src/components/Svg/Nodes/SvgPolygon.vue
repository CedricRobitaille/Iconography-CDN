<script setup lang="ts">
  import { computed } from 'vue';
  import type { treeNode, Polygon } from '../../../types';
  import { useEditorStore } from '../../../stores/editorSvg';

  interface Points {
    x: number;
    y: number;
  }

  const props = defineProps<{
    node: treeNode;
    editorMode?: boolean;
    keyLine?: boolean;
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

  const fill = computed(() => props.node.style.fill.fill);
  const fillOpacity = computed(() => props.node.style.fill.fillOpacity);

  const stroke = computed(() => props.node.style.stroke.stroke);
  const strokeOpacity = computed(() => {props.node.style.stroke.strokeOpacity});
  const strokeWidth = computed(() => props.node.style.stroke.strokeWidth);
  const strokeDasharray = computed(() => props.node.style.stroke.strokeDasharray);
  const strokeDashoffset = computed(() => props.node.style.stroke.strokeDashoffset)
  const strokeLinecap = computed(() => props.node.style.stroke.strokeLinecap);
  const strokeLinejoin = computed(() => props.node.style.stroke.strokeLinejoin);
  const strokeLineposition = computed(() => props.node.style.stroke.strokeLineposition)

  const emitClick = (event: MouseEvent): void => {
    
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

  <polygon 
    :class="{ 'editorShape': editorMode }"
    :points="pointsString"
    :fill="fill" 
    :fill-opacity="fillOpacity"
    :stroke="keyLine ? `cyan` : stroke"
    :stroke-opacity="strokeOpacity"
    :stroke-width="keyLine ? .5 : strokeWidth"
    :stroke-dasharray="strokeDasharray"
    :stroke-dashoffset="strokeDashoffset"
    :stroke-linecap="strokeLinecap"
    :stroke-linejoin="strokeLinejoin"
    :vector-effect="keyLine ? 'non-scaling-stroke' : 'none'"
    @click.stop="emitClick"
  />

</template>

<style scoped>
</style>