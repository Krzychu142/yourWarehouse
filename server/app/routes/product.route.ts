import express from 'express'
import AuthMiddleware from '../middleware/Auth.middleware'
import ProductController from '../controllers/Product.controller'
import { Role } from '../types/role.enum'

const router = express.Router()

router.get('/get', ProductController.getAllProduct)
router.post('/create', AuthMiddleware.checkIsEmployeeLoggedIn, AuthMiddleware.checkIsEmployeeHaveCorrectPermission([Role.MANAGER, Role.SALESMAN]), ProductController.createProduct)
router.delete('/delete', AuthMiddleware.checkIsEmployeeLoggedIn, AuthMiddleware.checkIsEmployeeHaveCorrectPermission([Role.MANAGER, Role.SALESMAN]), ProductController.deleteProduct)

export default router
