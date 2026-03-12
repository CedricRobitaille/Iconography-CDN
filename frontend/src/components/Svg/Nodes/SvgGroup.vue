<script setup lang="ts">
  import SvgNode from '../SvgNode.vue';
  import type { treeNode } from '../../../types';
  import { useEditorStore } from '../../../stores/editorSvg';

  const props = defineProps<{
    node: treeNode;
    editorMode?: boolean;
    keyLine?: boolean;
  }>();

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
  <g
    @click.stop="emitClick"
  >
    <SvgNode
      v-for="child in node.children"
      :key = child.id
      :node="child"
      :keyLine="keyLine"
    />
  </g>
</template>

<style scoped>
</style>