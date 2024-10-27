import mongoose from "mongoose";

const demoSchema = new mongoose.Schema({
 
    name:{
        type:String,
        required:true,

    },
    business:{
        type:String,
        required:true,
    },
    contact:{
        type:Number,
        required:true,
    },
    email:{
        type:String,
        reuired:true,
    },
    city:{
        type:String,
        required:true,
    },
    state:{type:String,
        required:true,
    }
},
{timestamps:true})

export default   mongoose.model("demoList",demoSchema)