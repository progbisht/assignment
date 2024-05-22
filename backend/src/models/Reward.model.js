import mongoose from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";


const rewardHistorySchema = mongoose.Schema({
        points: {
            type: Number,
            required: true,
            default: 0
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

rewardHistorySchema.plugin(mongooseAggregatePaginate)



export const Reward = mongoose.model("Reward", rewardHistorySchema)