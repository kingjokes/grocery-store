//importing libraries
const express = require('express')
const router = require('./routes/api/userRoutes')
const product = require('./controller/productController')
const user = require('./controller/userController')
const session = require('express-session')
const verifyToken = require('./middleware/verifyToken')
// const helmet = require('helmet');
const compression = require('compression');
const app = express()

app.use(compression()); //Compress all routes
// app.use(helmet());


app.set('view engine', 'ejs') //setting view engine as ejs

app.use(express.urlencoded({extended:true}))

app.use('/public',express.static(__dirname+'/public/'))//setting static contents path

app.use(session({ resave: true ,secret: '123456' , saveUninitialized: true})); //express session

app.use('/user',router) //handing all user routes

app.listen(3000,'localhost'); //creating server


//route handling
app.get('/', user.loginPage)
app.get('/register',user.registrationPage )

//passing session variables from request to response
app.use(function(req, res, next) {
    res.locals.email = req.session.email;
    res.locals.fullname = req.session.fullname;
    next();
});

//authenticate pages with middleware verifyToken
app.get('/home', verifyToken, product.fetchProducts)

app.get('/product-details/:id',verifyToken, product.productDetails)

app.get('/checkout',verifyToken, product.checkOut)

//page not found
app.use((req, res)=> {
    res.status(404).render('404', {
        title: 'Page not found'
    })
})
