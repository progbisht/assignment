import mongoose from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";


const rewardSchema = mongoose.Schema({
        points: {
            type: Number,
            required: true,
            default: 100
        },
        givenBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        givenTo: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
    },
    {
        timestamps: true
    }

)

rewardSchema.plugin(mongooseAggregatePaginate)

export const Reward = mongoose.model("Reward", rewardSchema)