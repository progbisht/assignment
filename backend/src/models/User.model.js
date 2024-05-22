import mongoose from "mongoose";


const userSchema = mongoose.Schema({
        
        fullName: {
            type: String,
            required: true,
            trim: true,
            index: true
        },
    }

)




export const User = mongoose.model("User", userSchema)