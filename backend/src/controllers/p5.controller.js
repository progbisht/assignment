import asyncHandler from "../utility/asyncHandler.js";
import ApiError from "../utility/ApiError.js";
import { User } from "../models/User.model.js"
import { Reward } from "../models/Reward.model.js"
import ApiResponse from "../utility/ApiResponse.js";
import mongoose from "mongoose";


const getP5Balance = asyncHandler( async(req, res) => {
    const { id } = req.params
    
    if(!id){
        throw new ApiError(400, `No P5 balance for ${id} found.`)
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
        new ApiResponse(200, balance , "User's P5 balance successfully.")
    )
})


const getP5History = asyncHandler( async(req, res) => {
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
                foreignField: "givenBy",
                as: "givenPoints"
            }

        },
        {
            $unwind: "$givenPoints"
        },
        {
            $lookup: {
                from: "users",
                localField: "givenPoints.givenTo",
                foreignField: "_id",
                as: "receiver"
            }
        },
        {
            $addFields: {
                receiverName: { $arrayElemAt: ["$receiver.fullName", 0] },
                
            }
        },
        {
            $project: {
                fullName: 1,
                givenPoints: 1,
                receiverName: 1
            }
        }
        

    ])



    res.status(200)
    .json(
        new ApiResponse(200, history , "User's P5 history fetched successfully.")
    )
})


const createRewardPoints = asyncHandler(async (req, res) => {
    const { id } = req.params
    console.log(id);
    const { fullName, points} = req.body

    if(!id){
        throw new ApiError(`User Id should be valid before doing any transaction.`)
    }

    const transferUser = await User.findOne({ fullName: fullName }).exec()

    if(!transferUser){
        throw new ApiError(400, `User with ${fullName} is not found in reccords`)
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

    if(parseInt(balance.givenPoints) + parseInt(points) > 100){
        throw new ApiError(400, `Remaining points are less than the entered value.`)
    }

    const newTransaction = await Reward.create({
        points: points,
        givenTo: transferUser._id,
        givenBy: id
    })

    const completedTransaction = await Reward.findById(newTransaction._id)

    res.status(200).json(
        new ApiResponse(200, completedTransaction, 'User points debited successfully.')
    )
})


const deleteP5Points = asyncHandler( async (req, res) => {

})




export { 
    getP5Balance,
    getP5History,
    createRewardPoints,
    deleteP5Points
}