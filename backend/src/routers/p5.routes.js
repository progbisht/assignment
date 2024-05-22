import { Router } from 'express'
import { 
    getP5Balance,
    createP5Points,
    deleteP5Points
} from '../controllers/p5.controller.js'



const router = Router()


router.route('/balance').get(getP5Balance)
router.route('/create').post(createP5Points)
router.route('/delete').get(deleteP5Points)



export default router