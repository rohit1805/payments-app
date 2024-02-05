const express = require("express");
const app = express();
const zod = require("zod");
const jwt = require("jsonwebtoken");
const Router = express.Router();
const JWT_SECRET  = require("../config");
const {Users, Account} = require("../db/db");
const {authMiddleware} = require("../middleware");

// const router = require(".");

const signupBody = zod.object({
     username : zod.string().email().trim(),
     password : zod.string().min(6).trim(),
     firstName : zod.string().max(50).trim(),
     lastName : zod.string().max(50).trim(),
})

Router.post("/signup", async (req, res) => {

    
    const username = req.body.username;
    const password = req.body.password;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;

    const validInputs = signupBody.safeParse(req.body);

    

    if(!validInputs.success){
        res.status(400).json({
            msg : "Invalid inputs"
        })
        return;
    }
    
    const isAlreadyPresent = await Users.findOne({
        username : username
    })

    // console.log("is present already - "+isAlreadyPresent);
    if(isAlreadyPresent){
        res.status(411).json({
            msg : "Email already taken / Incorrect inputs"
        })
        return;
    }

    const data = await Users.create({
        username : username,
        password : password,
        firstName : firstName,
        lastName : lastName
    })    

    const userId = data._id;

    await Account.create({
        userId,
        balance : 1 + Math.random() * 10000
    })

    const token = jwt.sign({userId}, JWT_SECRET);
    

    res.status(200).json({
        msg : "User created succesfully",
        token : token,  
    })
    
})

///////////////////////////////////////////////////////////////////////////////////////////////

const signinBody = zod.object({
    username : zod.string().email().trim(),
    password : zod.string().min(6).trim()
})

Router.post("/signin", async (req, res)=>{

    const validInputs = signinBody.safeParse(req.body);
    if(!validInputs.success){
        res.status(411).json({
            msg : "Invalid Inputs"
        })
    }

    const username = req.body.username;
    const password = req.body.password;

    const existingUser = await Users.findOne({
        username : username
    })

    if(!existingUser){
        res.status(404).json({
            msg : "User does not exist."
        })
        return;
    }

    const storedPassword = existingUser.password;
    if(storedPassword != password){
        res.status(401).json({
            msg : "The provided password is incorrect."
        })
        return;
    }

    const userId = existingUser._id;
    const token = jwt.sign({userId}, JWT_SECRET);

    res.status(200).json({
        token : token
    })
})

///////////////////////////////////////////////////////////////////////////////////////////////////////

const updateBody = zod.object({
    password : zod.string().min(6).optional(),
    firstName : zod.string().optional(),
    lastName : zod.string().optional()
})

Router.put("/", authMiddleware, async(req, res) => {
    // console.log("entered into the put request");
    const validInputs = updateBody.safeParse(req.body);

    console.log(validInputs.data);
    if(!validInputs.success){
        return res.status(411).json({
            msg : "Invalid Inputs"
        }) 
    }

    await Users.updateOne({_id : req.userId}, {
        $set : req.body
    })

    res.json({
        msg : "Updated successfully"
    })
})

Router.get("/bulk", async(req,res) => {
    const filter = req.query.filter || "";

    const users = await Users.find({
        $or : [{
            firstName: {
                "$regex" : filter
            }
        }, {
            lastName : {
                "$regex" : filter
            }
        }]
    })

    res.json({
        user : users.map(user => ({
            username : user.username,
            firstName : user.firstName,
            lastName : user.lastName,
            _id: user._id
        }))
    })
})


module.exports= Router;