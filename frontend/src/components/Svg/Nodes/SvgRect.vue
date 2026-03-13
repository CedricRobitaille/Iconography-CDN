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

  <rect 
    :class="{ 'editorShape': editorMode }"
    :x="rect.x"
    :y="rect.y"
    :width="rect.w"
    :height="rect.h"
    :rx="rect.rx"
    :ry="rect.ry" 
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