<!-- Recursive Render -->

<script setup lang="ts">
  import { computed } from 'vue';
  import type { treeNode } from '../../types'; 

  import SvgCircle from './Nodes/SvgCircle.vue';
  import SvgGroup from './Nodes/SvgGroup.vue';
  import SvgRect from './Nodes/SvgRect.vue';
  import SvgEllipse from './Nodes/SvgEllipse.vue';
  import SvgLine from './Nodes/SvgLine.vue';
  import SvgPath from './Nodes/SvgPath.vue';
  import SvgPolygon from './Nodes/SvgPolygon.vue';
  import SvgPolyline from './Nodes/SvgPolyline.vue';

  import { useEditorStore } from '../../stores/editorSvg';

  const canvas = useEditorStore();

  // Props
  const props = defineProps<{
    node: treeNode;
    editorMode?: boolean;
  }>();

  // Map the type to the Component.vue
  const componentMap = {
    circle: SvgCircle,
    ellipse: SvgEllipse,
    line: SvgLine,
    path: SvgPath,
    polygon: SvgPolygon,
    polyline: SvgPolyline,
    rect: SvgRect,
    folder: SvgGroup,
  } as const;

  // Log the mapped component.
  const component = computed(() =>{
    console.log(componentMap[props.node.type])
    return componentMap[props.node.type]
  });

  const isSelected = computed(() => {
    const state = props.editorMode && canvas.selectedNodeIds.includes(props.node.id)
    return state
  })

</script>

<template>
  <!-- Display the component linked to the type -->
  <component 
    :is="component" 
    :node="node" 
    :editorMode="editorMode"
  />

</template>

<style scoped>

</style>