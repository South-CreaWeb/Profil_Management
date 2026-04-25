<script setup lang="ts">
import { ref, onMounted } from "vue"
import type { Profil }  from "./types/profil.type";
import { getProfils, createProfil, deleteProfil} from "../src/api/profils"



const profils = ref<Profil[]>([])
const name = ref<string>("")
const role = ref<"captain" | "crew">("captain")
  
onMounted(async () => {
  profils.value = await getProfils()
})


async function handleCreate() {
  
  if(!name.value.trim()) return
  
  const newProfil = await createProfil({
    name: name.value,
    role: role.value
  })

  profils.value.push(newProfil)

  name.value = ""
}

async function handleDelete(id: string) {
  await deleteProfil(id)

  profils.value = profils.value.filter(profil => profil.id !== id)

}

</script>


<template>

  <h1>Create Profil</h1>

  <input type="text" v-model="name">

  <select v-model="role">
    <option value="captain">Captain</option>
    <option value="crew">Crew</option>
  </select>

  <button @click="handleCreate">Add profil</button>

  <ul>
    <li v-for="profil in profils" :key="profil.id">
      <span>Name: {{ profil.name }}</span> 
      <span>Role: {{ profil.role }}</span>
      <button @click="handleDelete(profil.id)">Delete profil</button>
    </li>
  </ul>

</template>