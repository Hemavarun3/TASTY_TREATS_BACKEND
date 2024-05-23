import express from 'express'
import { productUpload, allProducts } from '../Controllers/productController.js';

const productRouter=express.Router();

productRouter.post('/uploadProduct',productUpload);
productRouter.get('/allProducts',allProducts);

export default productRouter;