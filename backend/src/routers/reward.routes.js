import { Router } from 'express'
import { 
    getRewardBalance,
} from '../controllers/reward.controller.js'



const router = Router()


router.route('/balance').get(getRewardBalance)


export default router