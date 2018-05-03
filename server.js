const express=require('express');
const bodyParser=require("body-parser");
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extened:true}));
const MongoClient=require("mongodb").MongoClient;
const ObjectID=require('mongodb').ObjectID;
var db;
var path    = require("path");
var purchase="page1";



app.get('/terms',function(req,res){
  res.sendFile(path.join(__dirname+'/hidechat/Terms.html'));
});
app.get('/privacy',function(req,res){
  res.sendFile(path.join(__dirname+'/hidechat/Privacy.html'));
});
app.get('/about',function(req,res){
  res.sendFile(path.join(__dirname+'/hidechat/About.html'));
});


//#################change purchase
app.post('/hidechat_page',function(req,res){
    purchase=req.body.page;
    res.send(purchase);
})

app.use(express.static("hidechat"));
app.get('/', function (req, res) {
  res.send('Hello World!');
});
app.get('/style.css', function(req, res) {
  res.sendFile(__dirname + "/hidechat/" + "style.css");
});
app.get('/hidechat_page1',function(req,res){
  res.sendFile(path.join(__dirname+'/hidechat/page1.html'));
});
app.get('/hidechat_page2',function(req,res){
  res.sendFile(path.join(__dirname+'/hidechat/page2.html'));
});

app.get('/purchase_hidechat',function(req,res){
  res.sendFile(path.join(__dirname+'/hidechat/'+purchase+'.html'));
});


//####################################inapp####################################
app.get('/hidechat_inapp',function(req,res){
    db.collection('hidechat_inapp').find().toArray(function(err,docs){
        if (err){
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(docs)
    })
})
app.put('/hidechat_inapp/:inappid',function(req,res){
    const id=req.params.inappid;
    db.collection("hidechat_inapp").update({_id:ObjectID(id)}, {inapp:req.body.inapp});
    res.send(req.body.inapp);
});
app.post('/hidechat_inapp',function(req,res){
        var txt={ inapp:req.body.inapp,     
        };
    db.collection('hidechat_inapp').insert(txt,function(err,result){
        if(err){
            console.log(err);
            res.sendStatus(500);
        }
    res.send(txt);
    })
})






MongoClient.connect("mongodb://localhost:27017/hidechat",function(err,database){
    if(err){
        return console.log(err);
    }
    db=database;
    app.listen(3002);
    
})