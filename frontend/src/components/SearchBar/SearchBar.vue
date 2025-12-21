<script setup lang="ts">
  import { ref } from 'vue';

  const {placeholder} = defineProps<{
    placeholder: string;
  }>()


  interface Inputs {
    search: string;
  }
  const formData: Inputs = ref({
    search: "",
  })

  const handleSearch = () => {
    console.log(formData.value.search)
  }
</script>



<template>
  <form @submit.prevent="handleSearch">
    <div class="search">
      <input type="search" v-model="formData.search" :placeholder="placeholder" required>
    </div>
  </form>
</template>



<style scoped>

  ::-webkit-search-cancel-button {
    -webkit-appearance: none;
    display: inline;
    height: .5rem;
    width: .5rem;
    background:
      linear-gradient(45deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 43%, var(--text-40) 45%, var(--text-40) 55%, rgba(0, 0, 0, 0) 57%, rgba(0, 0, 0, 0) 100%),
      linear-gradient(135deg, transparent 0%, transparent 43%, var(--text-40) 45%, var(--text-40) 55%, transparent 57%, transparent 100%);
    cursor: pointer;
  }

  input[type="search"] {
    appearance: none;
    position: relative;
    padding-left: 2.5rem;
  }

  .search {
    position: relative;
  }

  .search::before {
    content: "";
    position: absolute;
    left: .75rem;
    top: 50%;
    transform: translateY(-50%);
    width: 1.25rem;
    height: 1.25rem;
    z-index: 1000;
    background-color: var(--text-30);
    -webkit-mask: url("data:image/svg+xml,%3Csvg viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20.33 19.3l-3.36-3.36a7.71 7.71 0 0 0 1.78-4.93c0-4.27-3.48-7.75-7.75-7.75s-7.75 3.48-7.75 7.75 3.48 7.75 7.75 7.75c1.86 0 3.57-.66 4.91-1.76l3.36 3.36c.15.15.34.22.53.22s.38-.07.53-.22c.29-.29.29-.77 0-1.06zM4.75 11c0-3.45 2.8-6.25 6.25-6.25s6.25 2.8 6.25 6.25-2.8 6.25-6.25 6.25-6.25-2.8-6.25-6.25z'/%3E%3C/svg%3E") no-repeat center / contain;
    mask: url("data:image/svg+xml,%3Csvg viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20.33 19.3l-3.36-3.36a7.71 7.71 0 0 0 1.78-4.93c0-4.27-3.48-7.75-7.75-7.75s-7.75 3.48-7.75 7.75 3.48 7.75 7.75 7.75c1.86 0 3.57-.66 4.91-1.76l3.36 3.36c.15.15.34.22.53.22s.38-.07.53-.22c.29-.29.29-.77 0-1.06zM4.75 11c0-3.45 2.8-6.25 6.25-6.25s6.25 2.8 6.25 6.25-2.8 6.25-6.25 6.25-6.25-2.8-6.25-6.25z'/%3E%3C/svg%3E") no-repeat center / contain;
    pointer-events: none;
  }
</style>