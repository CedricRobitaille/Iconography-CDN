<script setup lang="ts">
  import type { EditablePoint } from '../../../../types';
  import { useEditorStore } from '../../../../stores/editorSvg';

  const store = useEditorStore();

  const props = defineProps({
    points: { type: Array as () => EditablePoint[], required: true },
  })

  const onPointMouseDown = (point: EditablePoint) => {
    const onMouseMove = (e: MouseEvent) => {
      const deltaX = (e.clientX - store.dragStartX) / store.zoom;
      const deltaY = (e.clientY - store.dragStartY) / store.zoom;

      // update node property in store
      const node = store.flatNodes.find(n => n.id === point.nodeId);
      if (!node) return;
      const propsNode = node.properties as any;

      switch (node.type) {
        case "rectangle":
          if (point.type === "corner") {
            // determine which corner and adjust x/y/w/h accordingly
          }
          break;
        case "circle":
          if (point.type === "center") {
            propsNode.cx = point.x + deltaX;
            propsNode.cy = point.y + deltaY;
          }
          break;
        case "line":
          if (point.type === "endpoint") {
            if (point.index === 0) { propsNode.x1 = point.x + deltaX; propsNode.y1 = point.y + deltaY; }
            else { propsNode.x2 = point.x + deltaX; propsNode.y2 = point.y + deltaY; }
          }
          break;
        case "polygon":
        case "polyline":
          propsNode.points[point.index].x = point.x + deltaX;
          propsNode.points[point.index].y = point.y + deltaY;
          break;
        case "path":
          const cmd = propsNode.d.find((c: any) => c.id === point.actionId);
          if (point.type === "vertex") { cmd.d.x = point.x + deltaX; cmd.d.y = point.y + deltaY; }
          if (point.type === "control") {
            if ('x1' in cmd.d) cmd.d.x1 = point.x + deltaX;
            if ('y1' in cmd.d) cmd.d.y1 = point.y + deltaY;
            if ('x2' in cmd.d) cmd.d.x2 = point.x + deltaX;
            if ('y2' in cmd.d) cmd.d.y2 = point.y + deltaY;
          }
          break;
      }
    };

    const onMouseUp = () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };

    store.dragStartX = point.x;
    store.dragStartY = point.y;
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  };


</script>

<template>
  <g>
    <circle 
      v-for="point in points"
      :key="point.nodeId + '-' + point.index"
      :cx="point.x"
      :cy="point.y"
      r="5"
      class="handle"
      @mousedown.stop="onPointMouseDown(point)"
    />
  </g>
</template>

<style scoped>
  .handle {
    fill: var(--bg);
    stroke: 1px solid blue;
    cursor: move;
  }
</style>