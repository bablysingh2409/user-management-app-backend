const express=require('express');
const auth=require('./routes/auth')
const connectDB=require('./config/db');
const cors=require('cors');
const app=express();

app.use(cors());
app.use(express.json());
 
connectDB();

app.use('/auth',auth);

app.use((err,req,res,next)=>{
    const errorStatus=err.status||500;
    const errMsg=err.message|| "something went wrong";
    return res.status(errorStatus).json({
        success:false,
        status:errorStatus,
        message:errMsg,
        stack:err.stack
    })
})


app.listen('5500',()=>{
    console.log('server is rennuing on port 5500')
})

