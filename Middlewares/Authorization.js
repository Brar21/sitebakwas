const authorized=(req,res,next)=>{
    const {authorization}=req.headers
    if(!authorization){
        return res.json("Please Login First!")
    }
    next()
}
module.exports={authorized}