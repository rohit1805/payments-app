const express = require("express");

const Router = express.Router();
const {authMiddleware} = require("../middleware");
const {Account} = require("../db/db");
const { route } = require("./user");
const mongoose = require("mongoose");


Router.get("/balance", authMiddleware, async (req, res) => {
    const userId = req.userId;

    const account = await Account.findOne({
        userId
    })

    if(account){
        res.status(200).json({
            balance : account.balance
        })
    } else {
        res.status(400).json({
            msg : "Error occured, unable to fetch the accout balance"
        })
    }
})

/////////////////////////////////////////////////////////////////////////////////////////////


Router.post("/transfer", authMiddleware, async (req, res) => {
    // const {to, amount} = req.body;

    // const sender = await Account.findOne({
    //     userId : req.userId
    // })

    // if(sender.balance < amount){
    //     return res.status(400).json({
    //         msg : "Insufficient balance"
    //     }) 
    // }

    // const toAccount = await Account.findOne({
    //     userId : to
    // }) 

    // if(!toAccount){
    //     return res.status(400).json({
    //         msg : "Invalid account"
    //     })
    // }

    // await Account.updateOne({userId : req.userId}, {
    //     $inc : {
    //         balance : -amount
    //     }
    // })

    // await Account.updateOne({userId : to}, {
    //     $inc : {
    //         balance : amount
    //     }
    // })

    // res.status(200).json({
    //     msg : "Transfer successful"
    // })
    //////////////////////////////// ABOVE IS BAD SOLUTION ///////////////////////////////////////////

    const secssion = await mongoose.startSession();

    secssion.startTransaction();
    const {amount, to} = req.body;

    const account = await Account.findOne({userId : req.userId});

    if(!account || account.balance < amount){
        return res.status(400).json({
            msg : "Insufficient balance"
        })
    }

    const toAccount = await Account.findOne({userId : to})

    if(!toAccount){
        return res.status(400).json({
            msg : "Invalid account"
        })
    }

    //perform the transfer
    await Account.updateOne({userId : req.userId}, {$inc : {balance : -amount}});
    await Account.updateOne({userId : to}, {$inc : {balance : amount}});

    await secssion.commitTransaction();

    res.status(200).json({
        msg : "Transfer Successful"
    })
    
})


module.exports= Router;