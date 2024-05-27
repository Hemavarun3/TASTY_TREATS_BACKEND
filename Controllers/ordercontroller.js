import { orderModel } from '../Models/ordermodel.js';

const ordercontroller = async (req,res,next) => {
    try {
        const order=req.body;
        const email=order.email,userid=order.userid;
        if(!order.name || !order.address || !order.email)
        {
            return res.status(400).send({data : "Insufficient Details",alert : false});
        }
        const order_exist=await orderModel.findOne({
            userid : userid,
            status : false
        });
        if(order_exist)
        {
            return res.status(400).send({data : "Order with this email Already exist",alert : false});
        }
        const order_save=await orderModel.create(order);
        res.status(200).send({data : "Order Placed Successfully",alert : true})
    } catch (error) {
        res.status(500).send({data :"Something went wrong",alert : false})
    }
}

const getAllorders =async (req,res,next) => {
    try {
        const data = await orderModel.find({
            status : false
        });
        res.status(200).send(data);
    } catch (error) {
        res.status(401).send({data : `${error.message}`,alert : false});
    }
}
const orderUpdate =async (req,res,next) => {
    try {
        const data = await orderModel.findByIdAndUpdate(req.body,{
            status : 1
        });
        res.status(200).send({data : `Order Completed`,alert : true});
    } catch (error) {
        res.status(401).send({data : `${error.message}`,alert : false});
    }
}

const userpendingorders =async (req,res,next) => {
    try {
        const user=req.body;
        const data = await orderModel.find({
            userid : user.userid,
            status : false
        });
        res.status(200).send({data : data,alert : true});
    } catch (error) {
        res.status(401).send({data : `${error.message}`,alert : false});
    }
}

const userorderhistory =async (req,res,next) => {
    try {
        const user=req.body;
        const data = await orderModel.find({
            userid : user.userid,
            status : true
        });
        res.status(200).send({data : data,alert : true});
    } catch (error) {
        res.status(401).send({data : `${error.message}`,alert : false});
    }
}

export  {ordercontroller, getAllorders,orderUpdate,userorderhistory,userpendingorders};
