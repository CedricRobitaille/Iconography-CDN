<script setup lang="ts">
import { ref } from "vue"
import { RouterLink } from "vue-router";

import { darkMode } from "../../stores/darkMode";
const { toggleDarkMode, globalDarkMode } = darkMode()
</script>

<template>
  <nav>
    <div>
      <RouterLink id="home" to="/" >
        <svg viewBox="0 0 24 24" width="24" height="24">
          <path d="M20 10v10h-5.68v-2.97c0-1.28-1.04-2.32-2.32-2.32s-2.32 1.04-2.32 2.32V20H4V10l8-6 8 6z"
            class="cls-1" />
        </svg>
      </RouterLink>
    </div>
    <ul>
      <li>
        <button @click="toggleDarkMode" class="mode-toggle">
          <svg v-if="!globalDarkMode" id="light-mode-icon" viewBox="0 0 24 24" width="20" height="20">
            <g>
              <line x1="17.66" x2="19.07" y1="6.34" y2="4.93" class="cls-2" />
              <line x1="4.93" x2="6.34" y1="19.07" y2="17.66" class="cls-2" />
              <line x1="12" x2="12" y1="20" y2="22" class="cls-2" />
              <line x1="12" x2="12" y1="2" y2="4" class="cls-2" />
              <line x1="6.34" x2="4.93" y1="6.34" y2="4.93" class="cls-2" />
              <line x1="19.07" x2="17.66" y1="19.07" y2="17.66" class="cls-2" />
              <line x1="20" x2="22" y1="12" y2="12" class="cls-2" />
              <line x1="2" x2="4" y1="12" y2="12" class="cls-2" />
            </g>
            <circle cx="12" cy="12" r="5" class="cls-2" />
          </svg>
          <svg v-else id="dark-mode-icon" viewBox="0 0 24 24" width="20" height="20">
            <path
              d="M21.95 13.27a9.938 9.938 0 0 1-2.84 5.75 9.969 9.969 0 0 1-7.07 2.93c-5.52 0-10-4.48-10-10 0-2.76 1.12-5.26 2.93-7.07a9.938 9.938 0 0 1 5.75-2.84 8.014 8.014 0 0 0 .66 10.57 8.014 8.014 0 0 0 10.57.66z"
              class="cls-3" />
          </svg>
        </button>
      </li>
      
      <li>
        <button id="settings-btn">
          <svg id="settings-icon" viewBox="0 0 24 24" width="20" height="20">
            <circle cx="12" cy="11.98" r="3" class="cls-3" />
            <path
              d="M18.96 16.13l.61.61c.46.46.49 1.2.08 1.7-.37.44-.77.84-1.21 1.21-.5.42-1.24.38-1.7-.08l-.61-.61c-.79-.79-2.13-.23-2.13.88v.87c0 .64-.48 1.19-1.12 1.25-.29.03-.58.04-.88.04s-.59-.01-.88-.04A1.25 1.25 0 0 1 10 20.71v-.87c0-1.11-1.35-1.67-2.13-.88l-.61.61c-.46.46-1.2.49-1.7.08-.44-.37-.84-.77-1.21-1.21-.42-.5-.38-1.24.08-1.7l.61-.61c.79-.79.23-2.13-.88-2.13h-.87c-.64 0-1.19-.48-1.25-1.12C2.01 12.59 2 12.3 2 12s.01-.59.04-.88c.06-.64.61-1.12 1.25-1.12h.87c1.11 0 1.67-1.35.88-2.13l-.61-.61c-.45-.45-.5-1.18-.09-1.68.19-.23.39-.44.59-.65.21-.21.42-.4.65-.59.49-.41 1.22-.36 1.68.09l.61.61c.79.79 2.13.23 2.13-.88v-.87c0-.64.48-1.19 1.12-1.25.29-.03.58-.04.88-.04s.59.01.88.04c.64.06 1.12.61 1.12 1.25v.87c0 1.11 1.35 1.67 2.13.88l.61-.61c.45-.45 1.18-.5 1.68-.09.23.19.44.39.65.59.21.21.4.42.59.65.41.49.36 1.22-.09 1.68l-.61.61c-.79.79-.23 2.13.88 2.13h.87c.64 0 1.19.48 1.25 1.12.03.29.04.58.04.88s-.01.59-.04.88A1.25 1.25 0 0 1 20.71 14h-.87c-1.11 0-1.67 1.35-.88 2.13z"
              class="cls-3" />
          </svg>
        </button>
      </li>

      <li>
        <button id="profile-btn">
          <img src="" alt="" class="profile-picture">
        </button>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
nav {
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  width: 100%;
  background-color: var(--black-20);
  border-bottom: 1px solid var(--border)
}

ul {
  padding: 0px 1rem;
  display: flex;
  flex-direction: row;
  gap: .25rem;
}

ul button {
  padding: calc(.5rem + 2px);
  border-radius: 16px;
}

.cls-2 {
  fill: none;
  stroke: #2f3031;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 1.5px;
}

.cls-3 {
  fill: none;
  stroke: #acb1b4;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 1.5px;
}

button:hover .cls-3 {
  stroke: #e6e9eb;
}

#home {
  background-color: transparent;
  border-right: .5px solid var(--border);
  padding: .5rem;
  cursor: pointer;
  width: fit-content;
}

#home:hover {
  background-color: var(--black-30);
}

.cls-1 {
  fill: none;
  stroke: #d4d9db;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 1.5px;
}

#home:hover .cls-1 {
  stroke: #fff;
}

.profile-picture {
  height: 20px;
  width: 20px;
  border-radius: 10px;
}
</style>