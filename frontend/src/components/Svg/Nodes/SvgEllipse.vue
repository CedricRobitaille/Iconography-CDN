<script setup lang="ts">
  import { computed } from 'vue';
  import type { treeNode, Ellipse } from '../../../types';
  import { useEditorStore } from '../../../stores/editorSvg';

  const props = defineProps<{
    node: treeNode;
    editorMode?: boolean;
  }>();

  // ! Extract shape properties
  const ellipse = computed<Ellipse>(() => {
    return props.node.properties as Ellipse
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

</script>

<template>

  <ellipse 
    :cx="ellipse.cx"
    :cy="ellipse.cy"
    :rx="ellipse.rx"
    :ry="ellipse.ry"
    :fill="fill" 
    :stroke="stroke" 
    :stroke-width="sWidth"
    :stroke-linecap="sLinecap"
    :stroke-linejoin="sLinejoin"
    @click.stop="emitClick"
  />

</template>

<style scoped></style>