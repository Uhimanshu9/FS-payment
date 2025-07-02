    const mongoose = require('mongoose');
    const { Schema } = mongoose;

    const url =MONGO_URL
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
