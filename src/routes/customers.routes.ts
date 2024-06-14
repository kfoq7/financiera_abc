import { Router } from 'express'
import {
  deleteCustomer,
  getCustomers,
  registerCustomer,
  updateCustomer
} from '../controllers/customers.controller'

const router = Router()

router.post('/', registerCustomer)

router.get('/', getCustomers)

router.put('/:id', updateCustomer)

router.delete('/:id', deleteCustomer)

export { router }
