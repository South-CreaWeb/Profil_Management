<script setup lang="ts">
import { ref, onMounted } from "vue"
import type { Profil }  from "./types/profil.type";



const profils = ref<Profil[]>([])
const name = ref<string>("")
const role = ref<"captain" | "crew">("captain")
  
  
onMounted(async () => {
  const response = await fetch('http://localhost:3000/profils')
  const data = await response.json()

  profils.value = data
})

async function postProfil(newProfil: Profil) {
  const response = await fetch('http://localhost:3000/profils', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json' 
    },
    body: JSON.stringify(newProfil)
  })

  const data = await response.json()

  profils.value.push(data)

}

function createProfil() {
  
  if(!name.value.trim()) return
  
  const newProfil = {
    id: crypto.randomUUID(),
    name: name.value,
    role: role.value
  }
  
  
  postProfil(newProfil)
  
  name.value = ""
}

async function eraseProfil(id: string) {
  await fetch(`http://localhost:3000/profils/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  }) 
}

function deleteProfil(id: string) {

  profils.value = profils.value.filter(profil => profil.id !== id) 
  
  eraseProfil(id)

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