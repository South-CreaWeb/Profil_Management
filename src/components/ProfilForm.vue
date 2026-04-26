<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import type { Profil } from "../types/profil.type"

const name = ref<string>('')
const role = ref<"captain" | "crew">("captain")

const isValid = computed(() => name.value.trim().length > 0)

const props = defineProps<{
    loading: boolean,
    editingProfil: Profil | null
}>()

const emit = defineEmits<{
    (emit: 'create', data: { name: string, role: "captain" | "crew"}): void
}>()

function handleSubmit() {
    if(!name.value.trim()) return

    emit('create', {
        name: name.value,
        role: role.value
    })

    name.value = ''
}

watch(() => props.editingProfil, (newProfil) => {
    if(newProfil) {
        name.value = newProfil.name
        role.value = newProfil.role
    }
})

</script>

<template>
    <section class="form_profil">
        <input type="text" v-model="name">

        <select v-model="role">
        <option value="captain">Captain</option>
        <option value="crew">Crew</option>
        </select>

        <button @click="handleSubmit" :disabled="props.loading || !isValid">
            {{ props.editingProfil ? "update profil" : "Add profil" }} 
        </button>
  </section>
</template>