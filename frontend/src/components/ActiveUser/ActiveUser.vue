<script setup lang="ts">

const role = "Designer"
const username = "Cedric Robitaille";
const companyName = "General Assembly"

</script>

<template>
  <div id="active-user">
    <p class="role">{{ role }}</p>
    <h3 class="user">{{ username }}</h3>
    <p class="company">{{ companyName }}</p>
  </div>
</template>

<style scoped>

#active-user {
  padding: 1.5rem 1rem;
  display: flex;
  flex-direction: column;
  gap: .25rem;
  border-bottom: .5px solid var(--border);
}

.user {
  font-size: 1.25rem;
  font-weight: 800;
}

.role {
  font-size: .65rem;
  font-weight: 700;
  color: var(--bg);
  padding: .4rem .75rem .35rem;
  width: fit-content;
  background-color: var(--accent);
  border-radius: 1rem;
  margin-bottom: .5rem;
}

.company {
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-30)
}

</style>