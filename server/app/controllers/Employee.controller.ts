import { Request, Response } from 'express'
import EmployeeService from '../services/Employee.service'
import ErrorsHandlers from '../utils/helpers/ErrorsHandlers'

class EmployeeController {
  static async getAllEmployees(req: Request, res: Response): Promise<void> {
    try {
      const employees = await EmployeeService.getAllEmployees()
      res.json(employees)
    } catch (error: unknown) {
      res.status(500).json(ErrorsHandlers.errorMessageHandler(error))
    }
  }
}

export default EmployeeController
