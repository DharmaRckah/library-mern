import mongoose from "mongoose" ;
const connectDb= async()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI) 
        console.log(`Database connected successfully on host  ${conn.connection.host}`)
    } catch (error) {
        console.log(`Error in db ${error}`)
    }
}

export default connectDb