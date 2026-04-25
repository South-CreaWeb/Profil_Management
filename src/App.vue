<script setup lang="ts">
import { ref, onMounted } from "vue"
import type { Profil }  from "./types/profil.type";
import { getProfils, createProfil, deleteProfil} from "../src/api/profils"
import ProfilList from "./components/ProfileList.vue";
import ProfilForm from "./components/ProfilForm.vue"



const profils = ref<Profil[]>([])
  
onMounted(async () => {
  profils.value = await getProfils()
})


async function handleCreate(data: { name: string, role: "captain" | "crew"}) {
  
  const newProfil = await createProfil(data)

  profils.value.push(newProfil)
}

async function handleDelete(id: string) {
  await deleteProfil(id)

  profils.value = profils.value.filter(profil => profil.id !== id)

}

</script>


<template>

  <h1>Create Profil</h1>

  <ProfilForm @create="handleCreate"/>
  <ProfilList :profils="profils" @delete="handleDelete"/>

</template>