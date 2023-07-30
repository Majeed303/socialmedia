import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        firstName:{
            type: String,
            required: true,
            min : 2,
            max: 40,
        },
        lastName:{
            type: String,
            required: true,
            min : 2,
            max: 40,
        },
        email:{
            type: String,
            required: true,
            unique: true,
            max: 40,
        },
        password:{
            type: String,
            required: true,
            min : 5,
            max: 40,
        },
        picturePath:{
            type: String,
            default:"",
        },
        friends:{
            type: Array,
            default :[],
       },
       location :String,
       occupation: String,
       viewedProfile:Number,
       impressions:Number,
      },
      //it will give automatic dates
      { timestamps: true }
);
const User = mongoose.model("User", UserSchema);
export {User}