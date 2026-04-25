<script setup lang="ts">
import { ref, computed } from 'vue'

const name = ref<string>('')
const role = ref<"captain" | "crew">("captain")

const isValid = computed(() => name.value.trim().length > 0)

const props = defineProps<{
    loading: boolean
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
</script>

<template>
    <section class="form_profil">
        <input type="text" v-model="name">

        <select v-model="role">
        <option value="captain">Captain</option>
        <option value="crew">Crew</option>
        </select>

        <button @click="handleSubmit" :disabled="props.loading || !isValid">Add profil</button>
  </section>
</template>