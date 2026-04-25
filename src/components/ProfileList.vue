<script setup lang="ts">
import type { Profil } from "../types/profil.type";

const props = defineProps<{
    profils: Profil[],
    loading: boolean
}>()

const emit = defineEmits<{
    (emit: "delete", id: string): void
}>()
</script>

<template>
  <section class="display_profils">
    <ul>
      <li v-for="profil in props.profils" :key="profil.id">
        <span>Name: {{ profil.name }}</span> 
        <span>Role: {{ profil.role }}</span>
        <button @click="emit('delete', profil.id)" :disabled="props.loading">Delete profil</button>
      </li>
    </ul>
  </section>
</template>