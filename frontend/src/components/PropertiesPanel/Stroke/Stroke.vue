<script setup lang="ts">

  import { computed } from 'vue';
  import { sanitizeHex, sanitizeOpacity } from '../../../composables/sanitizer';
  import { useEditorStore } from '../../../stores/editorSvg';

  const canvas = useEditorStore();

  // User Input on input forms.
  const fillInput = computed({
    get: () => {
      return canvas.activeStyle.stroke.stroke;
    },
    set: (value: string) => {
      let hex = sanitizeHex(value)
      canvas.activeStyle.stroke.stroke = hex;
    }
  });

  const opacityInput = computed({
    get: () => {
      return canvas.activeStyle.stroke.strokeOpacity * 100;
    },
    set: (value: number) => {
      canvas.activeStyle.stroke.strokeOpacity = sanitizeOpacity(value / 100)
    }
  });

  const weightInput = computed({
    get: () => {
      return canvas.activeStyle.stroke.strokeWidth;
    },
    set: (value: number) => {
      canvas.activeStyle.stroke.strokeWidth = sanitizeOpacity(value)
    }
  })

  const positionInput = computed({
    get: () => {
      return canvas.activeStyle.stroke.strokeLineposition;
    },
    set: (value: string) => {
      canvas.activeStyle.stroke.strokeLineposition = value;
    }
  })

  const capInput = computed({
    get: () => {
      return canvas.activeStyle.stroke.strokeLinecap;
    },
    set: (value: string) => {
      canvas.activeStyle.stroke.strokeLinecap = value;
    }
  })

  const cornerInput = computed({
    get: () => {
      return canvas.activeStyle.stroke.strokeLinejoin;
    },
    set: (value: string) => {
      canvas.activeStyle.stroke.strokeLinejoin = value;
    }
  })

  const previewStyle = computed(() => ({
    backgroundColor: canvas.activeStyle.stroke.stroke
  }));

</script>





<template>
  <div class="input-field">
    <label for="">Color</label>
    <div class="input-collection">
      <div class="color-container">
        <div class="color-preview" :style="previewStyle"></div>
        <input type="text" class="color input-push" v-model="fillInput">
      </div>
      <div class="opacity-container">
        <input type="number" class="opacity" v-model.number="opacityInput">
      </div>
    </div>
  </div>

  <div class="input-grid">

    <!-- Weight -->
    <div class="input-container">
      <label for="weight">Weight</label>
      <div class="input-inner-container weight-container">
        <svg class="info-icon" fill="none" viewBox="0 0 20 20">
          <line x1="2" x2="18" y1="2.5" y2="2" stroke="#fff" />
          <rect width="15" height="4.5" x="2.5" y="12.5" stroke="#fff" />
          <rect width="15" height="3" x="2.5" y="6" stroke="#fff" />
        </svg>
        <input type="number" id="weight" class="input-push" v-model="weightInput">
      </div>
    </div>

    <!-- Position -->
    <div class="input-container">
      <label for="position">Position</label>
      <div class="input-inner-container position-container">
        <svg class="info-icon" viewBox="0 0 24 24">
          <g id="inside" v-if="positionInput === 'inside'">
            <polyline points="12 16 20 16 20 9 15 9 15 4 8 4 8 12" class="svg-style" />
            <rect width="4" height="4" x="4" y="16" class="svg-style" rx="2" ry="2" />
            <path d="M7.82 18.83c.64.28 1.35.44 2.1.44H18" class="svg-style" />
            <path d="M4.73 6v8.08c0 .72.15 1.4.41 2.02" class="svg-style" />
          </g>
          <g id="center" v-if="positionInput === 'center'">
            <path d="M14 10V4H4v14c0 1.1.9 2 2 2h14V10h-6z" class="svg-style" />
            <rect width="4" height="4" x="7.35" y="12.65" class="svg-style" rx="2" ry="2" />
            <line x1="20" x2="11.6" y1="15" y2="15" class="svg-style" />
            <line x1="9" x2="9" y1="4" y2="12.35" class="svg-style" />
          </g>
          <g id="outside" v-if="positionInput === 'outside'">
            <path d="M9 4H4v14c0 1.1.9 2 2 2h14v-5.34" class="svg-style" />
            <rect width="4" height="4" x="10" y="9.66" class="svg-style" rx="2" ry="2" />
            <line x1="20" x2="14" y1="11.66" y2="11.66" class="svg-style" />
            <line x1="12" x2="12" y1="4" y2="9.66" class="svg-style" />
            <line x1="20" x2="17" y1="14.66" y2="14.66" class="svg-style" />
            <line x1="9" x2="9" y1="4" y2="6.83" class="svg-style" />
          </g>
        </svg>
        <select id="position" v-model="positionInput">
          <option value="center">Center</option>
          <option value="inside">Inside</option>
          <option value="outside">Outside</option>
        </select>
      </div>
    </div>

    <!-- Cap -->
    <fieldset class="input-container">
      <label>Cap</label>
      <div class="radio-container">
        <label for="butt">
          <svg class="radio-icon" viewBox="0 0 24 24">
            <path d="M6 9.98c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2z" class="svg-style" />
            <path d="M22 12l-14-.02" class="svg-style" />
            <polyline points="6 9.98 6 6 22 6 22 18 6 18 6 13.98" class="svg-style" />
          </svg>
          <input type="radio" id="butt" name="cap" value="butt" v-model="capInput">
        </label>

        <label for="round">
          <svg class="radio-icon" viewBox="0 0 24 24">
            <path d="M8 9.98c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2z" class="svg-style" />
            <path d="M22 12l-12-.02" class="svg-style" />
            <path d="M8 6h14v12H8c-3.31 0-6-2.69-6-6s2.69-6 6-6z" class="svg-style" />
          </svg>
          <input type="radio" id="round" name="cap" value="round" v-model="capInput">
        </label>

        <label for="square">
          <svg class="radio-icon" viewBox="0 0 24 24">
            <path d="M8 9.98c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2z" class="svg-style" />
            <path d="M22 12l-12-.02" class="svg-style" />
            <rect width="20" height="12" x="2" y="6" class="svg-style" />
          </svg>
          <input type="radio" id="square" name="cap" value="square" v-model="capInput">
        </label>
      </div>
    </fieldset>


    <!-- Corner -->
     <fieldset class="input-container">
      <label>Corner</label>
      <div class="radio-container">
        <label for="miter">
          <svg class="radio-icon" viewBox="0 0 24 24">
            <path d="M14 10V4H4v16h16V10h-6z" class="svg-style" />
            <path d="M10 12c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2z" class="svg-style" />
            <path d="M20 14h-8M10 4v8" class="svg-style" />
          </svg>
          <input type="radio" id="miter" name="corner" value="miter" v-model="cornerInput">
        </label>

        <label for="bevel">
          <svg class="radio-icon" viewBox="0 0 24 24">
            <path d="M14 10V4H4v7l9 9h7V10h-6z" class="svg-style" />
            <path d="M10 12c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2z" class="svg-style" />
            <path d="M20 14h-8M10 4v8" class="svg-style" />
          </svg>
          <input type="radio" id="bevel" name="corner" value="bevel" v-model="cornerInput">
        </label>

        <label for="round-corner">
          <svg class="radio-icon" viewBox="0 0 24 24">
            <path d="M14 10V4H4v8c0 4.42 3.58 8 8 8h8V10h-6z" class="svg-style" />
            <path d="M10 12c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2z" class="svg-style" />
            <path d="M20 14h-8M10 4v8" class="svg-style" />
          </svg>
          <input type="radio" id="round-corner" name="corner" value="round" v-model="cornerInput">
        </label>
        
      </div>
    </fieldset>

  </div>
</template>


<style scoped>

  .radio-container svg {
    pointer-events: none;
  }

  label:has(input[type="radio"]:checked) {
    background-color: var(--bg-40);
  }

  .radio-container label {
    background-color: var(--bg-30);
    padding: .125rem;
    cursor: pointer;
    position: relative;
    height: 2rem;
  }

  .radio-container label:first-child {
    border-top-left-radius: .5rem;
    border-bottom-left-radius: .5rem;
  }

  .radio-container label:last-child {
    border-top-right-radius: .5rem;
    border-bottom-right-radius: .5rem;
  }

  input[type="radio"] {
    appearance: none;
    border: none;
    cursor: pointer;
    background-color: transparent;
  }

  input[type="radio"]:focus {
    outline: none;
  }


  .radio-container {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 2px;
  }

  .svg-style {
    stroke: var(--text);
    stroke-width: 1.125px;
    fill: none;
    stroke-linecap: round;
    stroke-linejoin: round;
  }


  .position-container {
    position: relative;
  }

  .position-container:after {
    content: "";
    top: calc(50% - 3px);
    right: 1rem;
    display: block;
    position: absolute;
    width: 6px;
    height: 6px;
    border-bottom: 2px solid var(--text);
    border-right: 2px solid var(--text);
    transform: rotate(45deg) translateY(-50%);
    pointer-events: none;
  }

  select {
    background-color: var(--bg-30);
    border-radius: .5rem;
    padding: .5rem .75rem .5rem 2.25rem;
    width: 100%;
    color: var(--text);
  }
  
  .weight-container:after {
    content: "PX";
    position: absolute;
    top: .5rem;
    right: .75rem;
    font-size: .85rem;
  }

  .input-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem .5rem;
  }

  .input-container {
    display: flex;
    flex-direction: column;
    gap: .5rem
  }

  .input-inner-container {
    position: relative;
  }

  .info-icon {
    position: absolute;
    top: .5rem;
    left: .5rem;
    pointer-events: none;
    height: 1.125rem;
    width: 1.125rem;
  }

  .radio-icon {
    position: absolute;
    pointer-events: none;
    height: 1.125rem;
    width: 1.125rem;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .input-push {
    padding-left: 2.5rem !important;
  }

  .input-field {
    display: flex;
    flex-direction: column;
    gap: .5rem;
  }

  .input-collection {
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 3px;
  }

  .input-collection input {
    border: none;
    padding: .5rem 1rem;
    font-size: .85rem;
  }

  .color-container {
    position: relative;
  }

  .color-preview {
    position: absolute;
    top: .4rem;
    left: .5rem;
    height: 1.125rem;
    width: 1.125rem;
    border-radius: .25rem;
    border: 1px solid var(--border);
    pointer-events: none;
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

</style>
