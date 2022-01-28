const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET || "shh"

function tokenMaker(user){
    const payload = {
        

    }
    const options = {

    }
    const token = jwt.sign(payload,JWT_SECRET,options)
    return token
}