import asyncHandler from "../utility/asyncHandler.js";
import ApiError from "../utility/ApiError.js";
import { User } from "../models/User.model.js"
import { Reward } from "../models/Reward.model.js"
import ApiResponse from "../utility/ApiResponse.js";
import mongoose from "mongoose";


const getRewardBalance = asyncHandler( async(req, res) => {
    const { id } = req.params

    if(!id){
        throw new ApiError(400, `No Reward balance for $${id} found.`)
    }

        
    const balance = await User.aggregate([
        {
            $match: {
                _id: new mongoose.Types.ObjectId(id)
            }
        },
        {
            $lookup: {
                from: "rewards",
                localField: "_id",
                foreignField: "givenBy",
                as: "givenPoints"
            }

        },
        {
            $lookup: {
                from: "rewards",
                localField: "_id",
                foreignField: "givenTo",
                as: "receivedPoints"
            }

        },
        {
            $addFields: {
                givenPoints: { $sum: "$givenPoints.points" },
                receivedPoints: { $sum: "$receivedPoints.points" }
            }
        },
        {
            $project: {
                fullName: 1,
                givenPoints: 1,
                receivedPoints: 1
            }
        }

    ])
    
    

    res.status(200)
    .json(
        new ApiResponse(200, balance, "User's reward balance fetched successfully.")
    )
})


const getRewardHistory = asyncHandler( async(req, res) => {
    const { id } = req.params
    
    if(!id){
        throw new ApiError(400, `No P5 balance for ${id} found.`)
    }

    
    const history = await User.aggregate([
        {
            $match: {
                _id: new mongoose.Types.ObjectId(id)
            }
        },
        {
            $lookup: {
                from: "rewards",
                localField: "_id",
                foreignField: "givenTo",
                as: "receivedPoints"
            }

        },
        {
            $unwind: "$receivedPoints"
        },
        {
            $lookup: {
                from: "users",
                localField: "receivedPoints.givenBy",
                foreignField: "_id",
                as: "sender"
            }
        },
        {
            $addFields: {
                senderName: { $arrayElemAt: ["$sender.fullName", 0] },
                
            }
        },
        {
            $project: {
                fullName: 1,
                receivedPoints: 1,
                senderName: 1
            }
        }
        

    ])



    res.status(200)
    .json(
        new ApiResponse(200, history , "User's reward history fetched successfully.")
    )
})


export { 
    getRewardBalance, 
    getRewardHistory
    
}