const { request } = require("express");
const express = require("express")

const mysql = require ( "mysql" );
const bodyParser = require("body-parser")
const PORT = process.env.PORT || 8080


//Connect to MySQL
var con = mysql.createConnection({
    host:'remotemysql.com',
    user:'Nu5ekHmTDw',
    password:'FKsymDRGAY',
    database:'Nu5ekHmTDw'
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

// admin login req
app.post("/adminlogin",(req,res,next)=> {

    var post_data = req.body

    var admin_name = post_data.name
    var admin_code = post_data.code
    con.query('Select * FROM admin WHERE admin_name =?',[admin_name],function(error,result,fields){
        con.on('error',function(err){
            console.log('[MYSQL]ERROR',err);
        });
        if(result && result.length)
        {
            var password = result[0].admin_code

            if(password == admin_code){
                res.json('You Are In');
            }else{
                res.json('Password inncorrect');
            }
        }
        else
        {
            res.end(JSON.stringify('NO admin'));
        }
    });
});

//admin new
app.post("/adminnew",(req,res,next)=> {

    var post_data = req.body
    var admin_name = post_data.name
    var admin_code = post_data.code
    var admin_status = post_data.status
    con.query('Select * FROM admin WHERE admin_name =?',[admin_name],function(error,result,fields){
        con.on('error',function(err){
            console.log('[MYSQL]ERROR',err);
        });
        if(result && result.length)
        {
            res.json('admin already Exist');
        }
        else
        {
            con.query('INSERT INTO `admin`(`admin_name`, `admin_code`, `admin_status`) VALUES (?,?,?)',[admin_name,admin_code,admin_status],function(error,result,fields){
                con.on('error',function(err){
                    console.log('[MYSQL]ERROR',err);
                });
                res.json('Registor Successful');

            })
        }
    });
});

//all Polls
app.get("/allpolls",(req,res,next)=> {
    con.query('Select * FROM polls',function(error,result,fields){
        con.on('error',function(err){
            console.log('[MYSQL]ERROR',err);
        });
        if(result && result.length)
        {
            res.end(JSON.stringify(result));
        }
        else
        {
            res.end(JSON.stringify('NO Poll'));
        }
    });
});

//selected poll
app.post("/thispoll",(req,res,next)=> {

    var post_data = req.body
    var poll_id = post_data.id
    con.query('Select * FROM polls WHERE poll_id =?',[poll_id],function(error,result,fields){
        con.on('error',function(err){
            console.log('[MYSQL]ERROR',err);
        });
        if(result && result.length)
        {
            res.end(JSON.stringify(result));
        }
        else
        {
            res.end(JSON.stringify('NO Poll'));
        }
    });
});

//Ongoing Polls
app.get("/ongopolls",(req,res,next)=> {
    con.query('Select * FROM polls Where poll_status="O"',function(error,result,fields){
        con.on('error',function(err){
            console.log('[MYSQL]ERROR',err);
        });
        if(result && result.length)
        {
            res.end(JSON.stringify(result));
        }
        else
        {
            res.end(JSON.stringify('NO Polls'));
        }
    });
});

//new poll
app.post("/newpoll",(req,res,next)=> {

    var post_data = req.body
    var poll_status = "P"
    var start_date = post_data.s_date
    var end_date = post_data.e_date
    var poll_title = post_data.title
    var poll_info = post_data.info
    var v1info = post_data.v1
    var v2info = post_data.v2
    var v3info = post_data.v3
    var v4info = post_data.v4
    var v5info = post_data.v5
    var v6info = post_data.v6
    var v7info = post_data.v7
    var v8info = post_data.v8

    var sql = "INSERT INTO `polls`(`poll_status`, `s_date`, `e_date`, `poll_title`, `poll_info`, `v1info`, `v2info`, `v3info`, `v4info`, `v5info`, `v6info`, `v7info`, `v8info`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)"

    con.query(sql,[poll_status,start_date,end_date,poll_title,poll_info,v1info,v2info,v3info,v4info,v5info,v6info,v7info,v8info],function(error,result,fields){
        con.on('error',function(err){
            console.log('[MYSQL]ERROR',err);
        });
        res.json('Add new poll Successful');

    })

});

//update poll
app.post("/updatepoll",(req,res,next)=> {

    var post_data = req.body
    var poll_id = post_data.id
    var start_date = post_data.s_date
    var end_date = post_data.e_date
    var poll_title = post_data.title
    var poll_info = post_data.info
    var v1info = post_data.v1
    var v2info = post_data.v2
    var v3info = post_data.v3
    var v4info = post_data.v4
    var v5info = post_data.v5
    var v6info = post_data.v6
    var v7info = post_data.v7
    var v8info = post_data.v8

    var sql = "UPDATE `polls` SET `s_date`=?,`e_date`=?,`poll_title`=?,`poll_info`=?,`v1info`=?,`v2info`=?,`v3info`=?,`v4info`=?,`v5info`=?,`v6info`=?,`v7info`=?,`v8info`=? WHERE poll_id = ?"

    con.query(sql,[start_date,end_date,poll_title,poll_info,v1info,v2info,v3info,v4info,v5info,v6info,v7info,v8info,poll_id],function(error,result,fields){
        con.on('error',function(err){
            console.log('[MYSQL]ERROR',err);
        });
        res.json('Update poll Successful');

    })

});

//Start Poll

app.post("/startpoll",(req,res,next)=>{
    var post_data = req.body
    var poll_id = post_data.id
    var status = "O"
    var sql2 = "UPDATE `polls` SET `poll_status`=? WHERE poll_id = ? "
    var sql1 = "Select * FROM polls WHERE poll_id = ?"
    var sql3 = "INSERT INTO `vote_token` (`poll_id`,`user_id`) SELECT poll_id FROM polls WHERE poll_id = ?,SELECT user_id FROM user"

    con.query(sql1,[poll_id],function(error,result,fields){
        con.on('error',function(err){
            console.log('[MYSQL]ERROR',err);
        });
        if(result && result.length){
            con.query(sql2,[status,poll_id],function(error,result,fields){
            con.on('error',function(err){
                console.log('[MYSQL]ERROR',err);
            });
                con.query(sql2,[poll_id],function(error,result,fields){
                con.on('error',function(err){
                    console.log('[MYSQL]ERROR',err);
                });
                    res.json('Start poll Successful');
                });
            });

            

        }
        else{
            res.json('Start poll Failed');
        }
    });

    

});


/// User API

//all user
app.get("/user",(req,res,next)=> {
    con.query('Select * FROM user',function(error,result,fields){
        con.on('error',function(err){
            console.log('[MYSQL]ERROR',err);
        });
        if(result && result.length)
        {
            res.end(JSON.stringify(result));
        }
        else
        {
            res.end(JSON.stringify('NO User'));
        }
    });
});





app.listen(process.env.PORT || 8080, ()=>{
    console.log(`Serer is running. ${PORT}`)
})