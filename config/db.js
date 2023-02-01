const mongoose = require('mongoose');
require('dotenv').config();

mongoose.set("strictQuery", false);

mongoose
    .connect('mongodb+srv://user:user@cluster0.ff2w5pp.mongodb.net/?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(()=>{
        console.log("DB Connected");
    })
    .catch((err) => console.log(err));
