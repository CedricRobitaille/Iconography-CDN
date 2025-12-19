import { ref } from 'vue'

const globalDarkMode = ref<boolean>(true)

export const darkMode = () => {
  const toggleDarkMode = () => {
    globalDarkMode.value = !globalDarkMode.value;
  }
  
  return {
    toggleDarkMode,
    globalDarkMode,
  }
}