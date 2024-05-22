import { Router } from 'express'
import { 
    getCurrentUser, 
    getAllUser,
    registerUser, 
    updateUserDetails, 
} from '../controllers/user.controller.js'



const router = Router()


router.route('/').post(registerUser)
router.route('/all').get(getAllUser)
router.route('/update-account').patch(updateUserDetails)

router.route('/:id').get(getCurrentUser)

export default router