const express =require("express");
const router =express.Router();
const lb=require("../models/leaderBoardModel");
const text=require("../models/textModel");


router.route('/create').post((req,res)=>{
    const username=req.body.username;
    const wpm=req.body.wpm;
    const accuracy=req.body.accuracy;
    const newLBEntry=new lb({
        username,
        wpm,
        accuracy,
    });
    newLBEntry.save();
});

router.route('/display').get((req,res)=>{
    lb.find()
        .then(foundLB => res.json(foundLB))
})


router.route('/text').get((req,res)=>{
    text.findOneRandom(function(err, element) {
        if (err) console.log(err);
        else res.json(element);})
})
module.exports =router;

