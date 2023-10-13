import { Request, Response } from 'express'
import { IEmployee } from '../models/employee.model'
import AuthService from '../services/Auth.service'
import ErrorsHandlers from '../utils/helpers/ErrorsHandlers'
import Joi from 'joi'

class AuthController {
    private static employeeValidator = Joi.object({
        name: Joi.string().required().min(3).max(255),
        surname: Joi.string().required().min(3).max(255),
        employedAt: Joi.date().required(),
        email: Joi.string().required().email(),
        password: Joi.string().required().min(6),
        role: Joi.string().required(),
        salary: Joi.number().required(),
        address: Joi.string().required(),
        city: Joi.string().required(),
        country: Joi.string().required(),
        postalCode: Joi.string().required(),
        phoneNumber: Joi.string().required(),
        birthDate: Joi.date().required(),
    })

    static async register(req: Request, res: Response): Promise<void> {
        const userData: IEmployee = req.body
        try {
            await AuthController.employeeValidator.validateAsync(userData)
            const employee = await AuthService.register(userData)
            res.json(employee)
        } catch (error: unknown) {
            res.status(500).json(ErrorsHandlers.errorMessageHandler(error))
        }
    }

    static async verifyEmail(req: Request, res: Response): Promise<void> {
        const token = req.params.token
        try {
            await AuthService.verifyEmail(token)
            res.json({ message: 'Email verified' })
        } catch (error: unknown) {
            res.status(500).json(ErrorsHandlers.errorMessageHandler(error))
        }
    }

    static async login(req: Request, res: Response): Promise<void> {
        const { email, password } = req.body
        try {
            const token = await AuthService.login(email, password)
            res.json({ token })
        } catch (error: unknown) {
            res.status(500).json(ErrorsHandlers.errorMessageHandler(error))
        }
    }

    static async forgotPassword(req: Request, res: Response): Promise<void> {
        const { email } = req.body
        try {
            await AuthService.forgotPassword(email)
            res.json({ message: 'Email sent' })
        } catch (error: unknown) {
            res.status(500).json(ErrorsHandlers.errorMessageHandler(error))
        }
    }

    static async resetPassword(req: Request, res: Response): Promise<void> {
        const { token } = req.params
        const { password } = req.body
        try {
            await AuthService.resetPassword(token, password)
            res.json({ message: 'Password changed' })
        } catch (error: unknown) {
            res.status(500).json(ErrorsHandlers.errorMessageHandler(error))
        }
    }
}

export default AuthController
