<script setup lang="ts">
import { ref, onMounted } from "vue"
import type { Profil }  from "./types/profil.type";
import { getProfils, createProfil, updateProfil , deleteProfil} from "../src/api/profils"
import ProfilList from "./components/ProfileList.vue";
import ProfilForm from "./components/ProfilForm.vue"
import Notifications from "./components/Notifications.vue";



const profils = ref<Profil[]>([])
const message = ref<{ text: string, type: "success" | "error"}>({
  text: "",
  type: "" as "success" | "error"
})
const loadingCreate = ref<boolean>(false)
const loadingDelete = ref<boolean>(false)
const editingProfil = ref<Profil | null>(null)
  
onMounted(async () => {
  profils.value = await getProfils()
})


async function handleCreate(data: { name: string, role: "captain" | "crew"}) {
  if(loadingCreate.value) return 

  loadingCreate.value = true

  try {
    if(editingProfil.value) {
      //UPDATE
      const update = await updateProfil(editingProfil.value.id, data)

      profils.value = profils.value.map(profil => 
        profil.id === update.id ? update : profil
      )

      editingProfil.value = null
      message.value = { text: "Profil modifié", type: "success" }
    } else {
      //CREATE
      const newProfil = await createProfil(data)
      profils.value.push(newProfil)
      message.value = {text: "Profil ajouté", type: "success"}
    }
  } catch (error) {
    message.value = {
      text: "Erreur lors de l'ajout",
      type: "error"
    }
  }

  loadingCreate.value = false


  setTimeout(() => {
   message.value = {
    text: "",
    type: "success"
  }
  }, 2000)
}

async function handleDelete(id: string) {
  if(loadingDelete.value) return 

  loadingDelete.value = true

  message.value = {
    text: "",
    type: "success"
  }
  
  try {
    await deleteProfil(id)
    profils.value = profils.value.filter(profil => profil.id !== id)
    message.value = {
      text: "Profil supprimé",
      type: "success"
    }
  } catch (error) {
    message.value = {
      text: "Erreur lors de la suppression",
      type: "error"
    }
  }

  loadingDelete.value = false

  setTimeout(() => {
    message.value = {
      text: "",
      type: "success"
    }
  }, 2000)
}

function handleEdit(profil: Profil) {
  editingProfil.value = profil
}

</script>


<template>

  <h1>Create Profil</h1>

  
  <ProfilForm @create="handleCreate" :editingProfil="editingProfil" :loading="loadingCreate"/>
  <Notifications :message="message"/>
  <ProfilList :profils="profils" @delete="handleDelete" @edit="handleEdit" :loading="loadingDelete"/>

</template>