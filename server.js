const express =require("express");
const app = express();
const cors =require("cors");
const mongoose=require("mongoose");
app.use(cors());
app.use(express.json());


mongoose.connect('mongodb://localhost/TypingTestLeaderBoard',{ useNewUrlParser : true })

app.use("/", require("./routes/Route"));

app.listen(3001,function(){
    console.log("express on 3001");
})