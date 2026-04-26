import express from 'express'
import cors from 'cors'
import { Profil } from './types/profil.type'

const app = express()
app.use(cors())
app.use(express.json())
const port: number = 3000

let profils: Profil[] = []

app.get('/profils', (request, response) => {
  response.status(200).json(profils)
})

app.post('/profils', (request, response) => {
  const data = request.body

  const newProfil = {
    id: crypto.randomUUID(),
    name: data.name,
    role: data.role,
  }

  profils.push(newProfil)

  response.status(201).send(newProfil)
})

app.put('/profils/:id', (request, response) => {
  const id = request.params.id
  const { name, role } = request.body

  profils = profils.map((profil) => (profil.id === id ? { ...profil, name, role } : profil))

  response.status(200).json({ id, name, role })
})

app.delete('/profils/:id', (request, response) => {
  const dataId = request.params.id

  profils = profils.filter((profil) => profil.id !== dataId)

  response.status(200).send(profils)
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
