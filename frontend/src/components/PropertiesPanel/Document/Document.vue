<script setup lang="ts">
  import { computed } from 'vue';
  import { sanitizeHex } from '../../../composables/sanitizer';
  import { useEditorStore } from '../../../stores/editorSvg';

  const canvas = useEditorStore();

  // User Input on input forms.
  const colorInput = computed({
    get: () => {
      return canvas.canvasColor;
    },
    set: (value: string) => {
      let hex = sanitizeHex(value)
      canvas.canvasColor = sanitizeHex(hex);
    }
  });

  const widthInput = computed({
    get: () => {
      return canvas.width;
    },
    set: (value: number) => {
      canvas.width = value;
    }
  });

  const heightInput = computed({
    get: () => {
      return canvas.height;
    },
    set: (value: number) => {
      canvas.height = value;
    }
  });






  const previewStyle = computed(() => ({
    backgroundColor: canvas.canvasColor
  }))
</script>



<template>
  <div class="input-field">

    <div class="input-container">
      <label>Color</label>
      <input type="text" v-model="colorInput">
      <div class="color-preview" :style="previewStyle"></div>
    </div>

    <div class="section-container">
      <label>Sizing</label>
      <div class="input-flex">

        <div class="input-container width">
          <input type="number" v-model="widthInput">
        </div>
        <svg id="by" viewBox="0 0 24 24" width="18px" height="18px">
          <line x1="6" x2="18" y1="6" y2="18" class="cls-1" />
          <line x1="18" x2="6" y1="6" y2="18" class="cls-1" />
        </svg>
        <div class="input-container height">
          <input type="number" v-model="heightInput">
        </div>

      </div>
    </div>
    
  </div>
</template>



<style scoped>

  .input-flex {
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    gap: .5rem;
    align-items: center;
  }

  .input-flex .input-container:after {
    content: "PX";
    position: absolute;
    right: .75rem;
    top: .5rem;
    font-size: .85rem;
  }

  .input-flex .input-container:before {
    position: absolute;
    left: .75rem;
    top: .5rem;
    font-size: .85rem;
    font-weight: 800;
    color: var(--text-30)
  }

  .width input,
  .height input {
    padding-left: 2.25rem !important;
  }

  .width:before {
    content: "W";
  }

  .height:before {
    content: "H";
  }

  .input-container {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: .5rem;
  }

  .section-container {
    display: flex;
    flex-direction: column;
    gap: .5rem;
  }

  .input-container input {
    padding-left: 2.5rem;
    text-transform: uppercase;
  }

  .color-preview {
    position: absolute;
    top: 1.85rem;
    left: .5rem;
    height: 1.125rem;
    width: 1.125rem;
    border-radius: .25rem;
    border: 1px solid var(--border);
    pointer-events: none;
  }

  .input-field {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .cls-1 {
    fill: none;
    stroke: var(--text);
    stroke-linecap: square;
    stroke-linejoin: bevel;
    stroke-width: 2px;
    width: 1.5rem;
    height: 1.5rem;
  }
</style>


