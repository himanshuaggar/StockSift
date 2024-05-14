require('dotenv').config();
require('express-async-errors');

const express = require('express');
const connectDB = require('./config/connect.js');
const authRouter = require('./routes/auth.js');
const stockRouter = require('./routes/stocks.js');


const app = express();
const port = process.env.PORT || 8000;

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URL);
        console.log("DB connected")
    } catch (error) {
        console.log(error);
    }
}

start();

app.get("/", ( req, res) => {
    res.send("Hello from server");
})

app.use("/auth", authRouter);
app.use("/stocks", stockRouter);

app.listen(port, () => {
    console.log(`server is running on port ${port}`)
})