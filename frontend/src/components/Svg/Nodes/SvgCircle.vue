<script setup lang="ts">
  import { computed } from 'vue';
  import type { treeNode, Circle } from '../../../types';
  import { useEditorStore } from '../../../stores/editorSvg';

  const props = defineProps<{
    node: treeNode;
    editorMode?: boolean;
    keyLine?: boolean;
  }>();

  // ! Extract circle properties
  const circle = computed(() => {
    return props.node.properties as Circle
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
      :class="{ 'editorShape' : editorMode }"
      :cx="circle.cx"
      :cy="circle.cy"
      :r="circle.r"
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
  </g>

  

</template>

<style scoped>

</style>