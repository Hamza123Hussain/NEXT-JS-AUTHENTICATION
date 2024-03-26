import mongoose from "mongoose"

export const MongoConnect=async()=>{
try {
    await mongoose.connect(process.env.MongoURL)
    console.log('DATABASE CONNCTED')

} catch (error) {
    console.log('DATABASE NOT CONNECTED')
}
}