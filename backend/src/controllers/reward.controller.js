import asyncHandler from "../utility/asyncHandler.js";
import ApiError from "../utility/ApiError.js";
import { User } from "../models/User.model.js"
import { Reward } from "../models/Reward.model.js"
import ApiResponse from "../utility/ApiResponse.js";



const getRewardBalance = asyncHandler( async(req, res) => {
    const { id } = req.params

    if(!id){
        throw new ApiError(400, `No Reward balance for $${id} found.`)
    }
    
    

    res.status(200)
    .json(
        new ApiResponse(200, reward, "Current user fetched successfully.")
    )
})







export { 
    getRewardBalance
    
}