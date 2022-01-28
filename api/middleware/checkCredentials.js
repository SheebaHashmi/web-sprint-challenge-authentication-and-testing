const checkCredentials = (req,res,next) => {
    const {username,password} = req.body
    if(!username || !password){
        next({status:400,message:"username and password required"})
    }
    next()
}
module.exports = checkCredentials