const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: String,
    password: String,
    cart:{
        cartItems:[
            {
                title:String,
                cost:Number,
                quantity:Number,
                image:String
            }
        ],
        totalcost:Number
    }


    
});

const user = mongoose.model('user',userSchema);


module.exports = user;