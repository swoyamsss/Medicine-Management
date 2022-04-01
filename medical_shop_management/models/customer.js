const mongoose=require('mongoose');

const customerSchema=new mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  address:{
    type:String,
    required:true
  },
  number:{
    type:Number,
    required:true
  },
  email:{
    type:String,
    required:true
  },
  comp:{
    type:String
  }
});

mongoose.model("Customer",customerSchema);