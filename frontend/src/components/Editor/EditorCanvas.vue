<script setup lang="ts">
  import { computed } from 'vue';
  import IconSvg from '../Svg/IconSvg.vue';
  import { useEditorStore } from '../../stores/editorSvg';
  
  const canvas = useEditorStore();

  // SVG viewbox, computed to log changes to pos/size
  const viewBox = computed(() => {
    const w = canvas.width / canvas.zoom;
    const h = canvas.height / canvas.zoom;
    // SVG viewbox params = xPos, yPos, width, height
    return `${-canvas.offsetX} ${-canvas.offsetY} ${w} ${h}`
  })

  console.log(canvas.rootNode)

  const onNodeClick = (node:any) => {
    console.log(node)
    canvas.selectNode
    //! This action is not being tunneled down to the individual element
    // To get it to work, See what was done in the rectangle shape.
    // We need to add the @click.stop to all the shapes.
  }

</script>

<template>
  <div class="editor-canvas">
    <IconSvg 
      :svg="canvas.rootNode"
      :viewBox?="viewBox"
      :editorMode="true"
      :onNodeClick?:="onNodeClick"
    />
  </div>
</template>

<style scoped>
  .editor-canvas {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
</style>