const mongoose=require("mongoose");

const leaderboardSchema=mongoose.Schema({
    username:{type:String},
    wpm:{type:String},
    accuracy:{type:String},
})

const lb=mongoose.model("LeaderBoard",leaderboardSchema);
module.exports=lb;

