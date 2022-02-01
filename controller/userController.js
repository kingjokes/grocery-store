const conn = require('../config/dbConnector')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const session = require('express-session')
require('dotenv').config()

//handles login action
const login = async (req,res)=>{
   let sql = conn.format("select * from users where email=?",[req.body.email])
    //sql query
    conn.query(sql, async (err, result, fields) => {
        if (err) return console.log(err)
        if (result.length === 1) {
            let checker = await bcrypt.compare(req.body.password, result[0].password) //verify hashed password
            if(checker) {
                //if user found, sign an auth token
                const accessToken = jwt.sign(
                    {"email": req.body.email },
                    process.env.ACCESS_TOKEN_SECRET,
                    {  expiresIn: '1h'}
                )
                //set headers
                res.setHeader('auth-token',accessToken)
                res.cookie('auth-token',accessToken,60*60*60)
                req.session.email = req.body.email;
                req.session.fullname =result[0].fullname

                //return responses
                return res.json({
                    message: 'Login Successfully, redirecting now..',
                    status: 200,
                    redirect: '/home',
                    user:req.body.email
                })
            }
           return  res.json({
                   message:'Incorrect Password..',
                   status:500,


               })
        }
        res.json({
            message:'Account not found',
            status:500,

        })
    })

}

//handles user registration
const register = async (req,res)=>{

    let checker = conn.format("select * from users where email=? or fullname=?",[req.body.email,req.body.fullname])
    //check if user exists
    await conn.query(checker,(err,result,field)=>{
        if(result.length>=1){
            return res.json({
                message:'User details already exist',
                status:500,
            })

        }
        //else hash user password and insert to db
        bcrypt.hash(req.body.password,10).then((hashedPassword)=>{
            let sql = conn.format("insert into users (fullname,email,password) values(?,?,?)", [req.body.fullname,req.body.email,hashedPassword])
            conn.query(sql,(err,result,field)=>{
                if(err){
                    console.log(err.message)
                    return res.json({
                        message:'Error signing up,kindly try again',
                        status:500,
                    })
                }
                return res.json({
                    message:'Registration successful,redirecting now...',
                    status:200,
                    redirect:'/'
                })
            })
        })

    })






}

//render login page
const loginPage = (req, res)=>{
    res.render('login',{
        title:'Welcome to Shopify | Login',
        errorMessage:''
    })
}


const registrationPage = (req, res)=>{
    res.render('register',{
        title:'Welcome to Shopify | Register'
    })
}

const logout =(req,res)=>{
    req.session.destroy((error)=>{
        if(!error){
            res.clearCookie('auth-token');
            res.status(307).render('login',{
                title:'Welcome to Shopify | Login',
                errorMessage:''
            })
        }
    })
    return true


}


module.exports={
    login,
    register,
    loginPage,
    registrationPage,
    logout

}
