import type { Request, Response } from 'express'
import { CustomerDAO } from '../dao/customers.dao'

export const registerCustomer = async (req: Request, res: Response) => {
  try {
    await CustomerDAO.registrarCliente(req.body)
    res.status(201).send({ message: 'Cliente registrado' })
  } catch (error) {
    res.status(500).send({ message: 'Error al registrar cliente', error })
  }
}

export const getCustomers = async (_req: Request, res: Response) => {
  try {
    const clientes = await CustomerDAO.listarClientes()
    res.status(200).send(clientes)
  } catch (error) {
    res.status(500).send({ message: 'Error al listar clientes', error })
  }
}

export const updateCustomer = async (req: Request, res: Response) => {
  try {
    await CustomerDAO.modificarCliente(Number(req.params.id), req.body)
    res.status(200).send({ message: 'Cliente modificado' })
  } catch (error) {
    res.status(500).send({ message: 'Error al modificar cliente', error })
  }
}

export const deleteCustomer = async (req: Request, res: Response) => {
  try {
    await CustomerDAO.eliminarCliente(Number(req.params.id))

    res.status(200).send({ message: 'Cliente eliminado' })
  } catch (error) {
    res.status(500).send({ message: 'Error al eliminar cliente', error })
  }
}
