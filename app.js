const express = require('express');
const app = express();
const path = require('path');

const mysql =require('mysql2');

const bodyParser = require('body-parser');
app.set("View engine","ejs");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

const pool =mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'dbmspro',
    password: 'kingkobra123@'
});

var myarray =[] ;




app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,'views','home.html'));
  
});

app.get("/room" ,function(req,res){
    res.render("after.ejs",{myarray:myarray});
})

app.post("/room",function(req,res){
    var days =req.body.days;
    // console.log(days);
    var timings =req.body.timings;
    // console.log(timings);
pool.execute("SELECT room_no FROM room where section in (SELECT section from " + req.body.days  +" where "+ req.body.timings  +" = 'free')",function(err,result){
if(err){
    myarray =[];
    
    console.log("no Free classes");

} 
else{
    if(result.length){
         myarray =[];
         console.log(result);
        for(var i=0;i<result.length;i++){
            console.log(result[0].room_no);
            myarray.push(result[i]); 
         
        }
    }
    else{
        myarray =[];
        console.log("NO free classes");
        }
        
        
    } 
    
    
});

res.redirect('/room');
   
});
app.get("/BB101",function(req,res){
    res.sendFile(path.join(__dirname,'views','BB101.html'));
});
app.get("/BB102",function(req,res){
    res.sendFile(path.join(__dirname,'views','BB102.html'));
});
app.get("/CSE301",function(req,res){
    res.sendFile(path.join(__dirname,'views','CSE301.html'));
});
app.get("/EC401",function(req,res){
    res.sendFile(path.join(__dirname,'views','EC401.html'));
});




app.listen(3000,err =>{
if(err)console.log("OOPS!!server failed")
else console.log("server started");
});







// <!-- <%}%>
// <%else%>
//     <h1>NOOOOo</h1> -->
// <!-- <%if(myarray.length){%> -->