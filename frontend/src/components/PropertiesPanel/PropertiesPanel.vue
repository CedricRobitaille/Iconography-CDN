<script setup lang="ts">
import PanelContainer from '../PanelContainer/PanelContainer.vue';
import Preview from './Preview/Preview.vue';
import SvgCode from './SvgCode/SvgCode.vue';


</script>

<template>
  <section id="properties">

    <PanelContainer :component="Preview" title="Preview"/>
    <PanelContainer :component="SvgCode" title="Color" />
    <PanelContainer :component="SvgCode" title="Fill" />
    <PanelContainer :component="SvgCode" title="Stroke" />
    <PanelContainer :component="SvgCode" title="Document" />
    <PanelContainer :component="SvgCode" title="Svg Code" />
    <PanelContainer :component="SvgCode" title="Export" />

  </section>
</template>

<style scoped>
  #properties {
    max-width: 18rem;
    width: 100%;
    background-color: var(--bg-20);
    height: 100%;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    border-left: .5px solid var(--border);
  }
</style>