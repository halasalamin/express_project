import { Request, Response, Express } from "express";
import express from 'express'
import  env  from "dotenv";
import dataSource from "./db/dbConfig.js";
import customerRouter from "./routes/router.js";
import { customErrorHandler, DefaultErrorHandler } from "./middleware/errorHandler.js";



const app: Express = express();
env.config()
const PORT = process.env.PORT || 5000;

app.use(express.json())
app.use('/customers', customerRouter)

// Route.
app.get("/", (req: Request, res: Response) => {
    res.send("hello world");
})

app.use(customErrorHandler)
app.use(DefaultErrorHandler)


dataSource.initialize().then(() =>{
   console.log('Connected to DB');
   
}).catch(error =>{
    console.log('failed to connect to DB' + error);
})

app.listen(PORT, () => {

    console.log("port is running on the " + PORT);
});


