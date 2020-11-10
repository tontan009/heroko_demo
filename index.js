const { request } = require("express");
const express = require("express")

const mysql = require ( "mysql" );
const bodyParser = require("body-parser")
const PORT = process.env.PORT || 8080


//Connect to MySQL
var con = mysql.createConnection({
    host:'sql12.freemysqlhosting.net',
    user:'sql12374220',
    password:'uFazZlPQlF',
    database:'sql12374220'
});

//Create Restful
const app = express()
var publicDir=(__dirname+'/public/');
app.use(express.static(publicDir));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));



app.get("/", (req, res)=>{
    res.json('You Are In');
})

//admin list
app.get("/admin",(req,res,next)=> {
    con.query('Select * FROM admin',function(error,result,fields){
        con.on('error',function(err){
            console.log('[MYSQL]ERROR',err);
        });
        if(result && result.length)
        {
            res.end(JSON.stringify(result));
        }
        else
        {
            res.end(JSON.stringify('NO admin'));
        }
    });
});

app.listen(process.env.PORT || 8080, ()=>{
    console.log(`Serer is running. ${PORT}`)
})