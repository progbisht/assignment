import asyncHandler from "../utility/asyncHandler.js";
import ApiError from "../utility/ApiError.js";
import { User } from "../models/User.model.js"
import ApiResponse from "../utility/ApiResponse.js";



const registerUser = asyncHandler( async(req, res) => {
    
    const { fullName } = req.body

    if( [fullName].some( (field) => field?.trim === "")){
        throw new ApiError (400, "All fields are required.")
    }

    const existedUser = await User.findOne({ fullName })

    if(existedUser){
        throw new ApiError(409, "User with username or email already exists")
    }



    const user = await User.create({
        fullName,
    })

    const createdUser = await User.findById( user._id )

    if(!createdUser){
        throw new ApiError(500,"Something went wrong while registerung a user.")
    }


    return res.status(201).json(
        new ApiResponse(201, createdUser, "User created successfully.")
    )


})



const getCurrentUser = asyncHandler( async(req, res) => {
    const { id } = req.params

    console.log(typeof id);
    
    if(!id){
        throw new ApiError(400, `No user with ${id} exist`)
    }

    const foundUser = await User.findOne({_id : id })

    

    res.status(200)
    .json(
        new ApiResponse(200, foundUser, "Current user fetched successfully.")
    )
})

const getAllUser = asyncHandler( async(req, res) => {
    
    const foundUser = await User.find()
    res.status(200)
    .json(
        new ApiResponse(200, foundUser, "Current user fetched successfully.")
    )
})

const updateUserDetails = asyncHandler( async(req, res) => {
    const { fullName } = req.body

    if(!fullName){
        throw new ApiError(400, "All fields are required.")
    }

    const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set: {
                fullName
            }
        },
        {
            new: true
        }
    ).select

    req.status(200)
    .json(
        new ApiResponse(200, user, "User details updated succesfully.")
    )
})


const newReward = asyncHandler( async(req, res) => {
    const { id } = req.params
    const { fullName, points } = req.body

    if(points > 100){
        throw new ApiError(400, "Maximum points limit exceeded.")
    }

    const rewards = await Reward.findOne({ _id: id }).populate('reward').exec()

    console.log(rewards);
    
    req.status(200)
    .json(
        new ApiResponse(200, user, "New reward created successfully.")
    )
})


export { 
    registerUser,
    getCurrentUser,
    getAllUser,
    updateUserDetails,
    
}