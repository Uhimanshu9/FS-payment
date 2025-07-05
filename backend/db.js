    const mongoose = require('mongoose');
    const { Schema } = mongoose;

    const url ='mongodb+srv://ADMIN:45ff4c3H@cluster0.c8u64.mongodb.net/paytm?retryWrites=true&w=majority&appName=Cluster0'
    mongoose.connect(url)


    const userSchema = new Schema({
        username: String,
        password: String,
        firstName: String,
        lastName: String
    });


    const accountsSchema = new Schema({
        userId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true
        },
        balance:{
            type:Number,
            required:true
        }
    });
    const User = mongoose.model('User', userSchema);
    const Account = mongoose.model('Account',accountsSchema,)
    // export userSchema;


    module.exports = {
        User,
        Account
    };
