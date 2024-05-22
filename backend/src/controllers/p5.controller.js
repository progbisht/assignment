import asyncHandler from "../utility/asyncHandler.js";
import ApiError from "../utility/ApiError.js";
import { User } from "../models/User.model.js"
import { Reward } from "../models/Reward.model.js"
import ApiResponse from "../utility/ApiResponse.js";



const getP5Balance = asyncHandler( async(req, res) => {
    const { id } = req.params

    if(!id){
        throw new ApiError(400, `No P5 balance for $${id} found.`)
    }
    
    const balance = await Reward.aggregate(
        {
           $match:  {
                _id: id
           }
        },
        {
            $lookup: {
                from: "rewards",
                localfield: "givenBy",
                foreignfield: "_id",
                as: "p5Balance"
            }
        },
        {
            $lookup: {
                from: "users",
                localfield: "_id",
                foreignfield: "givenBy",
                as: "rewardBalance"
            }
        },
        {
            $addFields: {
                p5Balance: {
                    $size: "$p5Balance"
                },
                rewardBalance: {
                    $size: "$rewardBalance"
                }
            }
        },
        {
            $project: {
                fullName: 1,
                p5Balance: 1,
                rewardBalance: 1
            }
        }

    )
    

    res.status(200)
    .json(
        new ApiResponse(200, reward, "Current user fetched successfully.")
    )
})


const createP5Points = asyncHandler(async (req, res) => {

})


const deleteP5Points = asyncHandler( async (req, res) => {

})




export { 
    getP5Balance,
    createP5Points,
    deleteP5Points
}