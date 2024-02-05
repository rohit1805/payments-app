const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/payTM");

const userSchema = new mongoose.Schema({
    username : {
        type : String, 
        required : true,
        unique : true,
        lowercase : true,
        trim : true
    },
    password : {
        type : String, 
        required : true,
        minLength : 6
    },
    firstName : {
        type : String,
        required : true,
        trim : true,
        maxLength : 50
    }, 
    lastName : {
        type : String,
        required : true,
        trim : true,
        maxLength : 50
    },
})


const accountSchema = new mongoose.Schema({
    userId: {
        type : mongoose.Schema.Types.ObjectId,
        ref: "User",
        required : true
    },
    balance: {
        type : Number,
        required : true
    }
});

const Users = mongoose.model("User", userSchema);
const Account = mongoose.model("Account", accountSchema)
module.exports={
    Users,
    Account
};