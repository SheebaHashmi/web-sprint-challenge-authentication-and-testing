const User = require('../auth/auth-model')
const checkPassword= async (req,res,next) => {
 
        let {password} = req.body
        const [userExists] = await User.findBy({password:password})
        if(!userExists){
            next({status:400,message:"invalid credentials"})
        }
        
            next()
   
}

module.exports = checkPassword