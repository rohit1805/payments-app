const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const port = 3000;

const rootRouter = require("./routes/index");

app.use(express.json())
app.use(cors());

app.use("/api/v1", rootRouter);


app.get("/" , (req,res) => {
    res.send("Backend");
})

app.listen(port, (req, res) => {
    console.log("Your app is running on https://localhost:3000");
})