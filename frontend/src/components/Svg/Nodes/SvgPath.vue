<script setup lang="ts">
  import { computed } from 'vue';
  import type { treeNode, Path, PathAction } from '../../../types';
  import { useEditorStore } from '../../../stores/editorSvg';

  const props = defineProps<{
    node: treeNode;
    editorMode?: boolean;
    keyLine?: boolean;
  }>();

  // ! Extract shape properties
  const path = computed<Path>(() => {
    return props.node.properties as Path
  })

  // Converts single PathAction to it's SVG string
  const actionString = (action: PathAction): string => {
    switch (action.type) {

      case "M":
        return `M ${action.d.x} ${action.d.y}`
      case "L":
        return `L ${action.d.x} ${action.d.y}`
      case "H":
        return `H ${action.d.x}`
      case "V":
        return `V ${action.d.y}`
      case "C":
        return `C ${action.d.x1} ${action.d.y1} ${action.d.x2} ${action.d.y2} ${action.d.x} ${action.d.y}`
      case "S":
        return `S ${action.d.x2} ${action.d.y2} ${action.d.x} ${action.d.y}`
      case "Q":
        return `Q ${action.d.x1} ${action.d.y1} ${action.d.x} ${action.d.y}`
      case "T":
        return `T ${action.d.x} ${action.d.y}`
      case "A":
        return `A ${action.d.rx} ${action.d.ry} ${action.d.xAxisRotation} ${action.d.largeArcFlag} ${action.d.sweepFlag} ${action.d.x} ${action.d.y}`
      case "Z":
        return `Z`
      default:
        return '';
    }
  }

  // Convert array of PathActions to a single SVG 'd' ActionString
  const d = computed(() => {
    // Points come in as an ActionObj like {type: H, action: d.x}
    // Depending on the type of action, we convert the action into a string
    // Then, we join all the actions together
    return path.value.d
      .map(action => actionString(action))
      .join(" ")
  });

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

  <path 
    :class="{ 'editorShape': editorMode }"
    :d="d"
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