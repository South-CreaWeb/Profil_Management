<script setup lang="ts">
import type { Profil } from "../types/profil.type";

const props = defineProps<{
    profils: Profil[],
    loading: boolean
}>()

const emit = defineEmits<{
    (emit: "delete", id: string): void
    (emit: 'edit', profil: Profil): void
}>()
</script>

<template>
  <section class="display_profils">
    <ul>
      <li v-for="profil in props.profils" :key="profil.id">
        <div class="display_info">
          <span>Name: {{ profil.name }}</span> 
          <span>Role: {{ profil.role }}</span>
        </div>
        <div class="display_cta">
          <button class="edit_cta" @click="emit('edit', profil)">Edit profil</button>
          <button class="delete_cta" @click="emit('delete', profil.id)" :disabled="props.loading">Delete profil</button>
        </div>
      </li>
    </ul>
  </section>
</template>

<style scoped>
.display_profils ul {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 25px;
}

.display_profils li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.display_profils .display_info {
  display: flex;
  justify-content: space-between;
  width: 50%;
}

.display_profils .display_cta {
  display: flex;
  justify-content: space-between;
  width: 30%;
}

.display_info span {
  width: 100%;
}

.display_cta button {
  padding: 5px;
}

.display_cta .edit_cta {
  color: #2563eb;
  border: 1px solid #2563eb;
  border-radius: 5px;
  background-color: #ffffff;
}

.display_cta .edit_cta:hover {
  background-color: #1d4ed8;
  color: #ffffff;
}

.display_cta .delete_cta {
  color: #dc2626;
  background-color: #ffffff;
  border: 1px solid #dc2626;
  border-radius: 5px;
}

.display_cta .delete_cta:hover {
  background-color: #dc2626;
  color: #ffffff;
}
</style>