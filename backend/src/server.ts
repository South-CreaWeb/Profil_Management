import express from 'express'
import { Profil } from './types/profil.type'

const app = express()
app.use(express.json())
const port: number = 3000

const profils: Profil[] = []

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

  const profil = profils.push(newProfil)

  response.status(201).send(profil)
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
