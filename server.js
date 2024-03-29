const express=require('express');
const auth=require('./routes/auth')
const connectDB=require('./config/db');
const cors=require('cors');
const user=require('./routes/user');
const cookieParser=require('cookie-parser');
const app=express();
require('dotenv').config();
const PORT=process.env.PORT || '5500';

app.use(cors());
app.use(express.json());
app.use(cookieParser());
 
connectDB();

app.use('/auth',auth);
app.use('/user',user)

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


app.listen(PORT,()=>{
    console.log('server is rennuing on port 5500')
})

