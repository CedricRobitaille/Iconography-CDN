import { ref } from 'vue'

const globalDarkMode = ref<boolean>(true)

export const darkMode = () => {
  const toggleDarkMode = () => {
    globalDarkMode.value = !globalDarkMode.value;

    const html = document.documentElement
    html.classList.toggle("dark-mode")
  }
  
  return {
    toggleDarkMode,
    globalDarkMode,
  }
}