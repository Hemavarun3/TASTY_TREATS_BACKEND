import { Router } from "express";
import {ordercontroller, getAllorders,orderUpdate,userorderhistory,userpendingorders} from '../Controllers/ordercontroller.js'

const orderRoutes=Router();

orderRoutes.post('/order',ordercontroller);
orderRoutes.post('/ordertatusupdate',orderUpdate);
orderRoutes.get('/adminDashboard',getAllorders);
orderRoutes.post('/userorderhistory',userorderhistory);
orderRoutes.post('/userpendingorders',userpendingorders);


export default orderRoutes;