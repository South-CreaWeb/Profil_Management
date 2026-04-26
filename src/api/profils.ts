const API_URL = 'http://localhost:3000/profils'

export async function getProfils() {
  const response = await fetch(API_URL)
  return await response.json()
}

export async function createProfil(data: { name: string; role: string }) {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  return await response.json()
}

export async function updateProfil(id: string, data: { name: string; role: string }) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  return await response.json()
}

export async function deleteProfil(id: string) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  })

  return await response.json()
}
