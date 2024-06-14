import type { Customer } from '../types'

const API_URL = 'http://localhost:8000/api/customers'

export const registerCustomer = async (data: Customer) => {
  await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
}

export const getCustomers = async () => {
  const response = await fetch(API_URL)
  const data = await response.json()
  return data
}

export const updateCustomer = async (id: number, data: Customer) => {
  await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
}

export const deleteCustomer = async (id: number) => {
  await fetch(`${API_URL}/${id}`, {
    method: 'DELETE'
  })
}
