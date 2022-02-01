const conn = require('../config/dbConnector')

//fetching products from db
const fetchProducts = (req,res)=>{
    let sql = conn.format("select * from products order by name asc");
    conn.query(sql, (err,result,field)=>{
        if(err)return console.log(err.message)
        return res.render('home',
            {
            products:result,
            title:'Welcome to Shopify | Home'
        } )
    })
}

//fetching product details
const productDetails = (req,res)=>{
    let sql = conn.format("select * from products where id=?",[req.params.id])
    conn.query(sql, (err,result,field)=>{
        if(err)return console.log(err.message)
        return res.render('details',{
            details:result[0],
            title:'Welcome to Shopify | Product Details'
        } )

    })
}

//rendering check out page
const checkOut =(req, res)=>{
    res.render('checkout',{
        title:'Welcome to Shopify | Check Out'
    })
}

module.exports={
    fetchProducts,
    productDetails,
    checkOut
}