<script setup lang="ts">
  import { computed, ref, toValue } from 'vue';
  import { useEditorStore } from '../../../stores/editorSvg';
  const canvas = useEditorStore();

  const currentStyle = ref("fill")

  const fillInput = computed({
    get: () => {
      if (currentStyle.value === "fill") {
        return canvas.activeStyle.fill.fill;
      } else {
        return canvas.activeStyle.stroke.stroke;
      }
    },
    set: (val: string) => {
      let formatted = val.toUpperCase();

      // Remove non-hex-ready characters
      // Only accept 0-9, A-Z, and start with "#"
      formatted = "#" + formatted.replace(/[^0-9A-F]/g, "");

      // Clamp to 7 chars
      if (formatted.length > 7) {
        formatted = formatted.slice(0,7);
      }

      if (currentStyle.value === "fill") {
        canvas.activeStyle.fill.fill = formatted;
      } else {
        canvas.activeStyle.stroke.stroke = formatted;
      }
    }
  })

  const opacityInput = computed({
    get: () => {
      // Get the opacity depending on current style
      if (currentStyle.value === "fill") {
        return canvas.activeStyle.fill.fillOpacity * 100;
      } else {
        return canvas.activeStyle.stroke.strokeOpacity * 100;
      }
    },
    set: (value: number) => {
      // Clamp the value
      let val = value;
      if (val > 100) {
        // Remove the last digit. 240 -> 24
        val = Math.floor(val / 10)
      }
      if (val < 0) {
        val = 0
      }

      // Set the canvas with the new values
      if (currentStyle.value === "fill") {
        canvas.activeStyle.fill.fillOpacity = val / 100;
      } else {
        canvas.activeStyle.stroke.strokeOpacity = val / 100;
      }
    }
  });

  const toggleStyle = (): void => {
    if (currentStyle.value === "fill") {
      currentStyle.value = "stroke";
      return;
    }
    currentStyle.value = "fill";
  }

  const setStyle = (style: string): void => {
    currentStyle.value = style;
  }

</script>

<template>

  <div id="picker-container">
    <div id="color-picker"></div>
  </div>

  <div id="color-slider">
    <button class="visibility"></button>
    <div>
      <div id="hue-slider"></div>
      <div id="transparency-slider"></div>
    </div>
  </div>

  <div id="color-select">
    <div id="style-toggle">
      <button 
        id="fill-toggle" 
        :style="{ 
          backgroundColor: canvas.activeStyle.fill.fill,
          zIndex: currentStyle === 'fill' ? 100 : 1
        }"
        @click="setStyle('fill')"
      ></button>
      <button 
        id="stroke-toggle" 
        :style="{ 
          borderColor: canvas.activeStyle.stroke.stroke, 
          zIndex: currentStyle === 'stroke' ? 100 : 1
        }"
        @click="setStyle('stroke')"
      ></button>
    </div>
    <form>
      <input type="text" class="color" v-model="fillInput" maxlength="7">
      <div class="opacity-container">
        <input type="number" class="opacity" v-model.number="opacityInput">
      </div>
      
    </form>
  </div>

</template>

<style scoped>
  #color-select {
    display: flex;
    gap: .5rem;
  }

  #style-toggle {
    width: 2rem;
    height: 2rem;
    position: relative;
    aspect-ratio: 1/1;
  }

  #style-toggle button {
    width: 1.125rem;
    height: 1.125rem;
    outline: .5px solid var(--border);
    position: absolute;
  }

  #fill-toggle {
    top: .125rem;
    left: .125rem;
  }

  #stroke-toggle {
    border-style: solid;
    border-width: 4px;
    background-color: var(--bg);
    bottom: .125rem;
    right: .125rem;
  }

  form {
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 3px;
  }
  input {
    border: none;
    text-transform: uppercase;
    padding: .5rem 1rem;
    font-size: .85rem;
  }

  .color {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }

  .opacity {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    width: calc(2ch + 1ch + 1rem + 2rem);
  }

  .opacity-container {
    position: relative;
  }
  .opacity-container::after {
    position: absolute;
    right: .5rem;
    top: .5rem;
    content: "%";
    font-size: .85rem;
    color: var(--text-30)
  }
  
</style>
