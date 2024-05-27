import { mongoose } from 'mongoose';

const orderSchema=mongoose.Schema({
    userid : {
        type : String,
        require : true
    },
    name : {
        type : String,
        require : true
    },
    email :{
        type :String,
        require :true,
    },
    address : {
        type : String,
        require : true
    },
    status : {
        type : Boolean,
        require : true
    },
    items :{
        type : [],
        requie : true
    }
});

export  const orderModel = mongoose.model("orders",orderSchema);
