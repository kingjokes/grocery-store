const mysql = require('mysql')
//create db connection using mysql
const con = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'ecommerce'
})
try{
    con.connect((error)=>{
        if(error)return  console.log("Unable to connect to db")
        return console.log('connected to db')
    })
}catch (e) {
    console.log(e)
}

module.exports=con