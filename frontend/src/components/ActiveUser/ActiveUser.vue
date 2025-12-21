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
  padding: .5rem .25rem;
  display: flex;
  flex-direction: column;
  gap: .25rem;
}

.user {
  font-size: 1.45rem;
  font-weight: 700;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.role {
  font-size: .75rem;
  font-weight: 700;
  color: var(--bg);
  padding: .34rem .75rem .3rem;
  width: fit-content;
  background-color: var(--accent);
  border-radius: 1rem;
  margin-bottom: .5rem;
}

.company {
  font-size: 1rem;
  font-weight: 400;
  color: var(--text-30);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

</style>