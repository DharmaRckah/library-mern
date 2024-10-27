import mongoose from "mongoose";

const userSchema = mongoose.Schema({

    businessName:{
        type:String,
       
    },
    userName:{
        type:String,
       
    },
    address:{
        type:String,
      
    },
    contact:{
        type:String,
       
    },
    email:{
        type:String,
        required:true,
        lowercase:true,
        unique:true,
       
    },
    password:{
        type:String,
        required:true,
    },
    businessType:{
        type:String,
       
    },
   
    role:{
        type:Number,
        required:true,
        default:0,
    },
    status: {
        type: String,
        enum: ["Active", "Inactive"],
      },
     paymentValidation:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"subscriptionPlan"
     },
      startDate: {
        type: Date,
      },
      endDate: {
        type: Date,
      },
      isFreeTrial: {
        type: Boolean,
        default: true,
      },
      freeCounter:{
        type:Number,
        defalt: 0,
      },
      fatherName:{
        type:String,
    
      },
      pincode:{
        type:Number,
      },
      state:{
        type:String,
      },
      admin:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
      }
},{
    timestamps:true,
})

export default mongoose.model("user",userSchema)