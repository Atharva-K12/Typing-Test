const mongoose=require("mongoose");
const random = require('mongoose-simple-random');
const textSchema=mongoose.Schema({
    text:{type:String},
})
textSchema.plugin(random);
const text=mongoose.model("text",textSchema);
module.exports=text;

