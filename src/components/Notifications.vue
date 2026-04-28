<script setup lang="ts">
const props = defineProps<{
    message: {
        text: string,
        type: "success" | "error"
    }
}>()
</script>

<template>
    <div class="display_notifs">
        <p v-if="props.message.text" :class="props.message.type">{{ props.message.text }}</p>
    </div>
</template>

<style scoped>
@keyframes slide-in {
  from {
    transform: translateX(100%);
  }

  to {
    transform: translateX(0%);
  }
}

.display_notifs {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.success {
    color: #15803d;
    background-color: #16a34a50;
    padding: 25px 75px;
    border: 1px solid #15803d;
    border-radius: 5px;
    animation: 300ms slide-in;
}

.error {
    color: #dc2626;
    background-color: #dc26264f;
    padding: 25px 75px;
    border: 1px solid #dc2626;
    border-radius: 5px;
    animation: 300ms slide-in;
}
</style>