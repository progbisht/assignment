import { Router } from 'express'
import { 
    getP5Balance,
    getP5History,
    createRewardPoints,
    deleteP5Points
} from '../controllers/p5.controller.js'



const router = Router()



router.route('/balance/:id').get(getP5Balance)
router.route('/history/:id').get(getP5History)
router.route('/create/:id').post(createRewardPoints)
router.route('/delete/:id').delete(deleteP5Points)


export default router