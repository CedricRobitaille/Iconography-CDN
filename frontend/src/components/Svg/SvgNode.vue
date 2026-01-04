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

  const props = defineProps<{
    node: treeNode;
  }>();

</script>

<template>

  <!-- Folder / Group -->
  <SvgGroup v-if="node.type === 'folder'" :node="node" />

  <!-- Shapes -->
  <SvgCircle v-if="node.type === 'circle'" :node="node" />
  <SvgEllipse v-if="node.type === 'ellipse'" :node="node" />
  <SvgLine v-if="node.type === 'line'" :node="node" />
  <SvgPath v-if="node.type === 'path'" :node="node" />
  <SvgPolygon v-if="node.type === 'polygon'" :node="node" />
  <SvgPolyline v-if="node.type === 'polyline'" :node="node" />
  <SvgRect v-if="node.type === 'rect'" :node="node" />

</template>

<style scoped>

</style>