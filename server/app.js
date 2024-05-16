require('dotenv').config();
require('express-async-errors');

const express = require('express');
const connectDB = require('./src/config/connect.js');
const authRouter = require('./src/routes/auth.js');
const stockRouter = require('./src/routes/stocks.js');
const errorHandlerMiddleware = require('./src/middleware/error-handler.js')
const authenticateUser = require('./src/middleware/authentication.js');
const notFound = require('./src/middleware/not-found.js');

const swaggerUI = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDoc = YAML.load('./src/docs/swagger.yaml');

const app = express();
const port = process.env.PORT || 8000;
app.use(express.json());

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URL);
        console.log("DB connected")
    } catch (error) {
        console.log(error);
    }
}

start();
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDoc));

app.get("/", ( req, res) => {
    res.send("Hello from server");
})

app.use("/auth", authRouter);
app.use("/stocks", authenticateUser , stockRouter);

//Middleware
app.use(notFound)
app.use(errorHandlerMiddleware);



app.listen(port, () => {
    console.log(`server is running on port ${port}`)
})