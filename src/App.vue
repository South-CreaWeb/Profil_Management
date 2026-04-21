<script setup lang="ts">
import { ref, onMounted } from "vue"
import type { Profil }  from "./types/profil.type";


const profils = ref<Profil[]>([])
const name = ref<string>("")
const role = ref<"captain" | "crew">("captain")

function initLocalStorage() {
  
  const initStorage = localStorage.getItem("profils")

  if(initStorage) {
    profils.value = JSON.parse(initStorage)
  }
}

onMounted(() =>  {
  initLocalStorage()
})

function createProfil() {

  if(!name.value.trim()) return

  const newProfil = {
    id: crypto.randomUUID(),
    name: name.value,
    role: role.value
  }

  profils.value.push(newProfil)

  localStorage.setItem("profils", JSON.stringify(profils.value))

  name.value = ""

}

function deleteProfil(id: string) {

  profils.value = profils.value.filter(profil => profil.id !== id) 
  

  localStorage.setItem("profils", JSON.stringify(profils.value))

}

</script>


<template>

  <h1>Create Profil</h1>

  <input type="text" v-model="name">

  <select v-model="role">
    <option value="captain">Captain</option>
    <option value="crew">Crew</option>
  </select>

  <button @click="createProfil">Add profil</button>

  <ul>
    <li v-for="profil in profils" :key="profil.id">
      <span>Name: {{ profil.name }}</span> 
      <span>Role: {{ profil.role }}</span>
      <button @click="deleteProfil(profil.id)">Delete profil</button>
    </li>
  </ul>

</template>