import express from 'express';
import cookieparser from 'cookie-parser'; 
import userRouter from './Routes/userRoutes.js'
import cors from 'cors';
import productRouter from './Routes/productRoutes.js';
import payment from './Controllers/paymentController.js';
import orderRoutes from './Routes/orderRoutes.js';


/* Building a server */
const app=express()
app.use(cors());

/* Used to convert json string if present in req.body to javascript object */
app.use(express.json());

/* Used to convert url-encoded data if present in req.body to javascript object */
app.use(express.urlencoded());

/* Used for the access of cookies present in the request*/
app.use(cookieparser());

app.listen(process.env.PORT || 8000,()=>{
    console.log(`Server is running on the port ${process.env.PORT || 8000}`);
})

app.get('/',(req,res,next)=>{
    res.send('Hello world');
})



app.use('/users',userRouter);
app.use('/products',productRouter);
app.use('/orders',orderRoutes);
app.post('/payment',payment);


export default app;
