const jwt = require('jsonwebtoken')

require('dotenv').config()

//token verify  middleware
const verifyToken = async (req, res, next)=>{
    const cookies = req.headers['cookie'] !== undefined
        ? req.headers['cookie'].split(';')
        :[]
    //extract user token from headers
    const token = cookies.find(item => item.includes('auth-token'))
    //return if no auth-token is found
    if(token===undefined) return res.status(401).render('login',{
        errorMessage:'Unauthorized access',
        title:'Welcome to Shopify | Login'
    })
    const userToken = token.split('=')[1]

    //verify user token
    jwt.verify(
        userToken,
        process.env.ACCESS_TOKEN_SECRET,
        (err,decoded)=>{
            //invalid token found
            if(err) return res.status(401).render('login',{
                errorMessage:'Invalid Token',
                title:'Welcome to Shopify | Login'
            })
            //send email to the next request
            req.email = decoded.email
            next()
        }
    )




}


module.exports= verifyToken