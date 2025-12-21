import { ref } from 'vue'

const globalTheme = ref<boolean>(true)

export const theme = () => {
  const toggleTheme = () => {
    globalTheme.value = !globalTheme.value;

    const html = document.documentElement
    html.classList.toggle("dark-mode")
  }

  return {
    toggleTheme,
    globalTheme,
  }
}