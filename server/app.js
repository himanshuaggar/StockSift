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

const holidays = ["2024-05-18", "2024-05-31"];

const {
    scheduleDayReset,
    update10minCandle,
    generateRandomDataEvery5Second,
} = require("./src/services/cronJob");

scheduleDayReset();
generateRandomDataEvery5Second();
update10minCandle();

const authenticateSocketUser = require("./src/middleware/socketAuth");
const socketHandshake = require("./src/middleware/socketHandshake");

const isTradingHour = () => {
    const now = new Date();
    const dayOfWeek = now.getDay(); // 0 (Sunday) to 6 (Saturday)
    const isWeekday = dayOfWeek > 0 && dayOfWeek < 6; // Monday to Friday
    const isTradingTime =
        (now.getHours() === 9 && now.getMinutes() >= 30) ||
        (now.getHours() > 9 && now.getHours() < 15) ||
        (now.getHours() === 15 && now.getMinutes() <= 30);

    const today = new Date().toISOString().slice(0, 10);

    const isTradingHour = isWeekday && isTradingTime && !holidays.includes(today);

    return isTradingHour;
};

const httpServer = require("http").createServer();
const io = require("socket.io")(httpServer, {
    cors: {
        origin: process.env.WEBSERVER_URI || "http://localhost:3000",
        methods: ["GET", "POST"],
        allowedHeaders: ["access_token"],
        credentials: true,
    },
});
io.use(socketHandshake);

io.on("connection", (socket) => {
    console.log("A client connected");

    socket.on("subscribeToStocks", async (stockSymbol) => {
        console.log("Client subscribed to stockSymbol:", stockSymbol);
        const sendUpdates = async () => {
            try {
                const stock = await Stock.findOne({ symbol: stockSymbol });
                if (!stock) {
                    console.log(`Stock '${stockSymbol}' not found`);
                } else {
                    socket.emit(`${stockSymbol}`, stock);
                }
            } catch (error) {
                console.error("Error fetching stock data:", error);
            }
        };
        sendUpdates();

        const intervalId = setInterval(sendUpdates, 5000);

        if (!isTradingHour()) {
            clearInterval(intervalId);
        }
    });

    socket.on("subscribeToMultipleStocks", async (stockSymbols) => {
        console.log("Client subscribed to multiple stocks:", stockSymbols);
        const sendUpdates = async () => {
            try {
                const stocks = await Stock.find({ symbol: { $in: stockSymbols } });
                const stockData = stocks.map((stock) => ({
                    symbol: stock.symbol,
                    currentPrice: stock.currentPrice,
                    lastDayTradedPrice: stock.lastDayTradedPrice,
                }));
                socket.emit("multipleStocksData", stockData);
            } catch (error) {
                console.error("Error fetching stock data:", error);
            }
        };
        sendUpdates();

        const intervalId = setInterval(sendUpdates, 5000);

        if (!isTradingHour()) {
            clearInterval(intervalId);
        }
    });

    socket.on("disconnect", () => {
        console.log("A client disconnected");
    });
});

httpServer.listen(process.env.SOCKET_PORT || 3001, () => {
    console.log(
        "WebSocket server is running and listening on port",
        httpServer.address().port
    );
});

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

app.get("/", (req, res) => {
    res.send("Hello from server");
})

app.use("/auth", authRouter);
app.use("/stocks",authenticateSocketUser, stockRouter);

//Middleware
app.use(notFound)
app.use(errorHandlerMiddleware);



app.listen(port, () => {
    console.log(`server is running on port ${port}`)
})