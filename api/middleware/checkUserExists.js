const User = require('../auth/auth-model')
const checkUserExists = async (req,res,next) => {
 
        let {username} = req.body
        const [existing] = await User.findBy({username:username})
        if(!existing){
           next()
        }
        else{
            next({status:400,message:"username taken"})
        }
   
}

module.exports = checkUserExists