import { Router } from 'express'
import { 
    getRewardBalance,
    getRewardHistory
} from '../controllers/reward.controller.js'



const router = Router()


router.route('/balance/:id').get(getRewardBalance)
router.route('/history/:id').get(getRewardHistory)


export default router