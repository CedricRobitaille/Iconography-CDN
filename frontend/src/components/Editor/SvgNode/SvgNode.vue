<script setup lang="ts">
  import { computed } from 'vue';
  import type { treeNode } from '../../../types';
  import { useEditorStore } from '../../../stores/editorSvg';

  const props = defineProps({
    node: { type: Object as () => treeNode, required: true },
  })

  const store = useEditorStore();

  // Is the current node selected
  const isSelected = computed(() => store.selectedNodeIds.includes(props.node.id))

  // Assign node to SVG tag
  const tag = computed(() => {
    switch (props.node.type) {
      case "rectangle": return "rect";
      case "circle": return "circle";
      case "ellipse": return "ellipse";
      case "line": return "line";
      case "polygon": return "polygon";
      case "polyline": return "polyline";
      case "path": return "path";
      default: return "g";
    }
  });

  // Map treeNode Props to SVG attributes







  // Add to SelectedNodeIds arr.
  const onNodeClick = (event: MouseEvent) => {
    store.selectNode(props.node.id, event.shiftKey); // shift = boolean, true to multi-select
  }

</script>

<template>
  <g>
    <component
      :is="tag"
      v-bind="props.node.properties"
      :class="isSelected ? 'selected' : 'default'"
      @mousedown.stop="onNodeClick"
    />
    <SvgNode 
      v-for="child in node.children"
      :key="child.id"
      :node="child"
    />
  </g>
</template>

<style scoped>
  .selected {
    stroke: 2px solid var(--text);
  }

  .default {
    stroke: 1px solid blue;
  }
</style>