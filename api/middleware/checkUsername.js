const User = require('../auth/auth-model')
const checkUsername= async (req,res,next) => {
 
        let {username} = req.body
        const [existing] = await User.findBy({username:username})
        if(!existing){
            next({status:401,message:"invalid credentials"})
        }
        else{
             req.user = existing
            next()
        }
   
}

module.exports = checkUsername