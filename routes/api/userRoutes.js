const express = require('express')
const router = express.Router()
const userHandler = require('../../controller/userController')



router.post('/login',userHandler.login)
router.post('/register',userHandler.register)
router.get('/logout',userHandler.logout)





module.exports=router