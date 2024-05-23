import { productModel } from "../Models/productmodel.js";



const productUpload=async (req,res,next) =>{
    try {
        console.log(req.body);
        const product=req.body;
        if(!product.name || !product.image || !product.price || !product.description || !product.category)
        {
            res.status(400).send({data : 'Incomplete data',alert : false});
        }
        const status=await productModel.create(product);
        res.status(200).send({message : 'Product Registered Succesfully',alert : true});
    } catch (error) {
        res.status(401).send({data : `${error.message}`,alert : false});
    }
}

const allProducts=async (req,res,next) =>{
    try {
        const data = await productModel.find({})
        res.status(200).send(data)
    } catch (error) {
        res.status(401).send({data : `${error.message}`,alert : false});
    }
}


export {productUpload,allProducts};