require('./config/db');
const path = require('path');
const http = require('http');
const fs = require('fs');
const uuid = require('uuid');
const myUUID = uuid.v4();


const express = require('express');
var cors = require('cors');
const Handlebars = require("handlebars");


const port = 8081
const app = express()
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

const { response } = require('express');


app.use(cors());

app.use(express.static('public'));

app.get('/', function(req, res){
    var options = {
        root: path.join(__dirname, 'public')
    }
    res.sendFile('index.html', options)
})


const user = require('./models/user');

//update database on login
app.post('/login', (req, res)=>{
    let {password, username} = req.body;
    if(username==""||password==""){ 
        res.json({  
            status: "FAIL",
            message: "Empty input field."
        });
    }else{
        user.find({username}).then(data =>{
            //console.log(data);
            //user exists
            if(data){
                password_db = data[0].password;
                //password matches
                if(password_db===password){
                    //uuid
                    res.type('application/json');
                    res.status(200).send(data[0]);
                }else{
                    res.type('application/json');
                    res.status(404);
                    res.send('{"message": "Something went wrong!"}');
                }
            }
        }).catch(error =>{
            res.json({
                status: "FAIL",
                message: "User doesn't exist."  
            })
        })

    }
})
//Signup 
app.post('/signup', (req,res)=>{
    let{username, password} = req.body;
    user.find({username}).then(result=>{
        if(result.length){
            setTimeout(()=>{
                res.redirect('./signup.html');
            },2000);
        }else{
            const newUser = new user({
                username:username,
                password:password,
                cart:{
                    cartItems:[],
                    totalcost:0
                }
            });
            
            newUser.save().then(result => {
                setTimeout(()=>{
                    res.redirect('/');
                },2000);
            }).catch(error1 =>{
                console.log(error1);
                res.json({
                    status:"FAIL",
                    message:"SignUp failed"
                })
            })
        }
    }).catch(error => {
        console.log(error);
    })

})
//update user cart
app.patch('/add_cart',(req,res)=>{
    let{username} = req.body;
    user.findOneAndUpdate({username:username},req.body,{new:true},
        (err,doc)=>{
            if(err) return res.status(500).send(err);
            res.status(200).send(doc);
        });
});
app.patch('/remove_cart',(req,res)=>{
    let{username} = req.body;
    user.findOneAndUpdate({username:username},req.body,{new:true},
        (err,doc)=>{
            if(err) return res.status(500).send(err);
            res.status(200).send(doc);
        });
})
//get cart size of user cart
app.post('/cart_size',(req,res)=>{
    let{username} = req.body;
    user.find({username}).then(result=>{
        let size=0;
        for(let item of result[0].cart.cartItems){
            size+= item.quantity;
        }
        res.status(200).json({
            size:size
        })
    })
})

app.post('/user/cart',(req,res)=>{
    let{username,id}=req.body;
    //console.log(req.body);
    user.find({username}).then(data=>{
        res.type('application/json');
        res.status(200).send(data[0]);
    }).catch(err =>{
        console.log(err);
    })
})


app.listen(port, () => {
    console.log(`API listening at http://localhost:${port}`)
})

