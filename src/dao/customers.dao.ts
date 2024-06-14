import { pool } from '../config/database'
import type { Customer } from '../types'

export class CustomerDAO {
  static async registrarCliente(customer: Customer) {
    const { name, email, phone } = customer
    const query = 'INSERT INTO clientes (nombre, email, telefono) VALUES (?, ?, ?)'
    const values = [name, email, phone]
    await pool.query(query, values)
  }

  static async listarClientes() {
    const query = 'SELECT * FROM clientes'
    const [result] = await pool.query(query)
    return result
  }

  static async modificarCliente(id: number, cliente: Customer) {
    const { name, email, phone } = cliente
    const query = 'UPDATE clientes SET nombre = ?, email = ?, telefono = ? WHERE id = ?'
    const values = [name, email, phone, id]
    await pool.query(query, values)
  }

  static async eliminarCliente(id: number) {
    const query = 'DELETE FROM clientes WHERE id = ?'
    const values = [id]
    await pool.query(query, values)
  }
}
