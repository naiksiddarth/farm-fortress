import mongoose from "mongoose"

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI,{
            dbName: process.env.DB_NAME
        })
        console.log("✅Mongo Connected")
    } catch (errors) {
        console.log("❌ Mongo connection failed")
        process.exit(1)
    }
}

export { connectDB }