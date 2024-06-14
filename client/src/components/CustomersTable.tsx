import { useState, useEffect } from 'react'
import type { Customer } from '../types'

export default function CustomersTable() {
  const [customers, setCustomers] = useState<Customer[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [formData, setFormData] = useState<Customer>({
    id: 0,
    nombre: '',
    email: '',
    telefono: ''
  })

  useEffect(() => {
    fetchCustomers()
  }, [])

  const fetchCustomers = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/customers')
      const data = await response.json()
      setCustomers(data)
      setIsLoading(false)
    } catch (error) {
      console.error('Error fetching customers:', error)
      setIsLoading(false)
    }
  }

  const handleAddCustomer = async () => {
    // Implement logic to add a new customer
    try {
      // Make API request to add customer
      // After successful addition, fetch customers again to update the list
      await fetch('http://localhost:8000/api/customers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      // Clear the form data
      setFormData({
        id: 0,
        nombre: '',
        email: '',
        telefono: ''
      })
      // Fetch customers again to update the list
      fetchCustomers()
    } catch (error) {
      console.error('Error adding customer:', error)
    }
  }

  const handleUpdateCustomer = async (id: number) => {
    // Implement logic to update customer with the given id
    try {
      // Make API request to update customer
      // After successful update, fetch customers again to update the list
      await fetch(`http://localhost:8000/api/customers/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      // Clear the form data
      setFormData({
        id: 0,
        nombre: '',
        email: '',
        telefono: ''
      })
      // Fetch customers again to update the list
      fetchCustomers()
    } catch (error) {
      console.error('Error updating customer:', error)
    }
  }

  const handleDeleteCustomer = async (id: number) => {
    // Implement logic to delete customer with the given id
    try {
      // Make API request to delete customer
      // After successful deletion, fetch customers again to update the list
      await fetch(`http://localhost:8000/api/customers/${id}`, {
        method: 'DELETE'
      })
      // Fetch customers again to update the list
      fetchCustomers()
    } catch (error) {
      console.error('Error deleting customer:', error)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">Customer Management</h1>

      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2">Add / Update Customer</h2>
        <input
          type="text"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          placeholder="Nombre"
          className="border border-gray-300 px-3 py-1 rounded mr-2"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className="border border-gray-300 px-3 py-1 rounded mr-2"
        />
        <input
          type="text"
          name="telefono"
          value={formData.telefono}
          onChange={handleChange}
          placeholder="Telefono"
          className="border border-gray-300 px-3 py-1 rounded mr-2"
        />
        <button onClick={handleAddCustomer} className="bg-green-500 text-white px-3 py-1 rounded">
          Add / Update
        </button>
      </div>

      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b text-left">Name</th>
            <th className="py-2 px-4 border-b text-left">Email</th>
            <th className="py-2 px-4 border-b text-left">Phone</th>
            <th className="py-2 px-4 border-b text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan={4} className="text-center py-4">
                Loading...
              </td>
            </tr>
          ) : (
            customers.map(({ email, id, nombre, telefono }) => (
              <tr key={id}>
                <td className="py-2 px-4 border-b">{nombre}</td>
                <td className="py-2 px-4 border-b">{email}</td>
                <td className="py-2 px-4 border-b">{telefono}</td>
                <td className="py-2 px-4 border-b">
                  <button
                    onClick={() => handleUpdateCustomer(id)}
                    className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteCustomer(id)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}
