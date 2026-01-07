<script setup lang="ts">
import PanelContainer from '../PanelContainer/PanelContainer.vue';
import Preview from './Preview/Preview.vue';
import Color from './Color/Color.vue';
import Fill from './Fill/Fill.vue';
import Stroke from './Stroke/Stroke.vue';
import Document from './Document/Document.vue';
import SvgCode from './CodeInput/CodeInput.vue';
import Export from './Export/Export.vue';


</script>

<template>
  <section id="properties">

    <PanelContainer :component="Preview" title="Preview"/>
    <PanelContainer :component="Color" title="Color" />
    <PanelContainer :component="Fill" title="Fill" />
    <PanelContainer :component="Stroke" title="Stroke" />
    <PanelContainer :component="Document" title="Document" />
    <PanelContainer :component="SvgCode" title="Svg Code" />
    <PanelContainer :component="Export" title="Export" />

  </section>
</template>

<style scoped>
  #properties {
    max-width: 18rem;
    width: 100%;
    background-color: var(--bg-20);
    height: calc(100vh - 2.75rem);
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    border-left: .5px solid var(--border);
  }
</style>