<script setup lang="ts">
const props = defineProps<{
    message: {
        text: string,
        type: "success" | "error"
    }
}>()
</script>

<template>
    <p v-if="props.message.text" :class="props.message.type">{{ props.message.text }}</p>
</template>

<style scoped>
.success {
    color: green;
}

.error {
    color: red;
}
</style>