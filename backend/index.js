if(process.env.NODE_ENV != "production"){
    require('dotenv').config();
}
const connectDB = require("./config/db");
connectDB();
const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname,"views"));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
const passport = require("passport");
app.use(passport.initialize()); 
const authRouter = require("./routes/auth");
const paperRouter = require("./routes/paper");

app.use("/auth",authRouter);
app.use("/paper",paperRouter);




app.listen((port), () => {
    console.log(`server is listening on port ${port}`);
});