<script setup lang="ts">
  import { computed, ref, watch} from 'vue';
  import { useEditorStore } from '../../../stores/editorSvg';
  import { sanitizeHex, sanitizeOpacity } from '../../../composables/sanitizer';
  import { HSBtoHEX, HEXtoHSB } from '../../../composables/converter';
  const canvas = useEditorStore();

  // Current Style (Fill or Stroke)
  const currentStyle = ref("fill")
  const setStyle = (style: string): void => {
    currentStyle.value = style;
  }

  // HSB state for the picker
  const hsb = ref({
    h: 0 ,
    s: 100,
    b: 50,
  });

  // Whenever the HSB is changed (ie: picker/slider),
  // Update the style in the pinia store.
  watch(hsb, (newHSB) => {
    const hex = HSBtoHEX(newHSB.h, newHSB.s, newHSB.b);
    // Input converted HEX into state
    if (currentStyle.value === "fill") {
      canvas.activeStyle.fill.fill = sanitizeHex(hex);
    } else {
      canvas.activeStyle.stroke.stroke = sanitizeHex(hex);
    }
  }, { deep: true })



  // User Input on input forms.
  const fillInput = computed({
    get: () => {
      if (currentStyle.value === "fill") {
        return canvas.activeStyle.fill.fill;
      } else {
        return canvas.activeStyle.stroke.stroke;
      }
    },
    set: (value: string) => {
      let hex = sanitizeHex(value);

      // Set the canvas with the new values
      if (currentStyle.value === "fill") {
        canvas.activeStyle.fill.fill = hex;
      } else {
        canvas.activeStyle.stroke.stroke = hex;
      }
      // Update the HSB values
      // hsb.value = HEXtoHSB(hex);
    }
  })

  // User input to change opacity
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
      let val = sanitizeOpacity(value)

      // Set the canvas with the new values
      if (currentStyle.value === "fill") {
        canvas.activeStyle.fill.fillOpacity = val / 100;
      } else {
        canvas.activeStyle.stroke.strokeOpacity = val / 100;
      }
    }
  });

  // Change the hue on hue-slider change
  const hueInput = computed({
    get: () => {
      return hsb.value.h
    },
    set: (val: number) => {
      hsb.value.h = val;
    }
  })

  // Enable colour picking on the colour picker
  const startPicking = (event: PointerEvent) => {
    const panel = event.currentTarget as HTMLElement;

    const onMove = (event: PointerEvent) => {
      const bounding = panel.getBoundingClientRect();
      const x = Math.min(Math.max(event.clientX - bounding.left, 0), bounding.width)
      const y = Math.min(Math.max(event.clientY - bounding.top, 0), bounding.height)

      hsb.value.s = Math.round((x / bounding.width) * 100);
      hsb.value.b = Math.round(100 - (y / bounding.height) * 100);
    }

    const onUp = () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
    }
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);

    onMove(event)
  }

  // Computed styling for the various page elements
  const panelStyle = computed(() => ({
    background: `
        linear-gradient(to top, #000, transparent),
        linear-gradient(to right, hsl(${hsb.value.h}, 0%, 100%), hsl(${hsb.value.h}, 100%, 50%))
      `
  }));

  const cursorStyle = computed(() => ({
    background: HSBtoHEX(hsb.value.h, hsb.value.s, hsb.value.b),
  }));

  const cursorPos = computed(() => ({
    left: `${hsb.value.s - 5}%`,
    top: `${100 - hsb.value.b - 5}%`
  }))


  // Instead of updating the HSB whenever HEX is changed, we'll do it here.
  // That way, we allow greater UX, like
  // Letting users put in partial inputs: ie: "#FF"
  const updateHSBFromHEX = () => {
    const hex = sanitizeHex(fillInput.value);
    // If the user inputted all 6 chars
    if (/^#([0-9A-Fa-f]{6})$/.test(hex)) {
      hsb.value = HEXtoHSB(hex);
    }
  };

</script>

<template>

  <div id="picker-container">
    <div 
      id="color-picker"
      :style="panelStyle"
      @pointerdown="startPicking"
    >
      <div id="picker-cursor" :style="cursorPos" >
        <div id="picker-inner" :style="cursorStyle"></div>
      </div>
    </div>
  </div>

  <div id="color-slider">
    <input type="range" min="0" max="360" id="hue-slider" v-model.number="hueInput">
    <input type="range" min="0" max="100" id="opacity-slider" v-model.number="opacityInput">
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
      <input type="text" class="color" v-model="fillInput" maxlength="7" @blur="updateHSBFromHEX">
      <div class="opacity-container">
        <input type="number" class="opacity" v-model.number="opacityInput">
      </div>
      
    </form>
  </div>

</template>

<style scoped>

  #picker-container {
    padding: .75rem;
    background-color: var(--bg-30);
    border-radius: .5rem;
  }

  #color-picker {
    position: relative;
    width: 100%;
    height: 9rem;
    cursor: crosshair;
    border-radius: 4px;
    
  }

  #picker-cursor {
    position: absolute;
    border-radius: 16px;
    border: 2px solid white;
    box-shadow: 2px 2px 12px -4px #000000aa;
  }

  #picker-inner {
    height: 16px;
    width: 16px;
    border-radius: 12px;
    mix-blend-mode: normal;
  }

  #color-slider {
    display: flex;
    flex-direction: column;
    gap: .5rem;
  }

  input[type="range"] {
    padding: 0;
    cursor: pointer;
    -webkit-appearance: none;
    appearance: none;
    width: 100%;
    height: .75rem;
    border-radius: 1rem;
    background: transparent;
  }

  #hue-slider {
    background: linear-gradient(to right,
      hsl(0, 80%, 50%),
      hsl(60, 80%, 50%),
      hsl(120, 80%, 50%),
      hsl(180, 80%, 50%),
      hsl(240, 80%, 50%),
      hsl(300, 80%, 50%),
      hsl(360, 80%, 50%));
  }

  #opacity-slider {
    background: linear-gradient(to right,
    rgba(255,255,255,0),
    rgba(255,255,255,1)
    );
  }

  input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    height: 1rem;
    width: 1rem;
    border-radius: 50%;
    border: 1.5px solid var(--bg-30);
    background-color: var(--text-10); 
  }

  input[type="range"]:focus {
    outline: none;
  } 


  /* Firefox */
  #hue-slider input[type="range"]::-moz-range-track {
    background: linear-gradient(
      to right,
      hsl(0, 100%, 50%),
      hsl(60, 100%, 50%),
      hsl(120, 100%, 50%),
      hsl(180, 100%, 50%),
      hsl(240, 100%, 50%),
      hsl(300, 100%, 50%),
      hsl(360, 100%, 50%)
    );
  }


  #color-select {
    display: flex;
    gap: .75rem;
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
