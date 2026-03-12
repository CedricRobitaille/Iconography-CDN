<script setup lang="ts">
  import { computed } from 'vue';
  import type { treeNode, Line } from '../../../types';
  import { useEditorStore } from '../../../stores/editorSvg';

  const props = defineProps<{
    node: treeNode;
    editorMode?: boolean;
    keyLine?: boolean;
  }>();

  // ! Extract shape properties
  const line = computed<Line>(() => {
    return props.node.properties as Line;
  })

  // We are not including fills since lines don't really do that...
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

  <line 
    :class="{ 'editorShape': editorMode }"
    :x1="line.x1"
    :y1="line.y1"
    :x2="line.x2"
    :y2="line.y2"
    fill="none" 
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