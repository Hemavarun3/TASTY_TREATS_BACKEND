/*include this for usage of environmental variables*/
import { configDotenv } from 'dotenv';
configDotenv();
import connectDb from './Db/index.js';
import app from './app.js';




/* Establishment of connection between Server and Data Base MONGODB */
connectDb()
.then(() => {
    /* Making server to wait for any error and reporting it. */
    app.on('error',(error)=>{
        console.log(`Server Not working -> ${error.message}`);
        res.status(500).json({ message: 'Internal Server Error', error: err.message });
    })

}).catch((err) => {
    console.log(err.message);
    console.log(`Something went wrong`);
});