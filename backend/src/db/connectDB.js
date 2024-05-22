import mongoose from "mongoose"

const connectDB = async () => {
    try{
        const connectionInstance = await mongoose.connect(`${process.env.DATABASE_URI}`)
        console.log(`MongoDB connected!! DB Host ${connectionInstance.connection.host}`)
    }
    catch(err){
        console.log("MongoDB connection error occured", err)
        process.exit(1)
    }
}

export default connectDB