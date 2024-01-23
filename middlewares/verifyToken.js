const jwt=require('jsonwebtoken');
const createError=require('./error');
require('dotenv').config();


const verifyToken=(req,res,next)=>{
    const token=req.cookies.access_token;
    
    if(!token) {
        return next(createError(401,'you are not authenticated'));
    };
    jwt.verify(token,process.env.JWT_SECRET,(err,user)=>{
       
        if(err) return next(createError(403,"token is not valid"));
        req.user=user;
        next();
    })

}

const verifyUser=(req,res,next)=>{
   
   console.log('paramaaaa',req.params.id)
    verifyToken(req,res,()=>{
       if(req.user.id==req.params.id){  
        next();
       }
       else{
        return next(createError(403,"you are not authorized"));
       }
    })
}

module.exports=verifyUser;