const express=require('express');
const mongoose=require('mongoose');

const app=express();

app.use(cors());
app.use(express.json());


app.listen('5500',()=>{
    console.log('server is rennuing on port 5500')
})

