const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
require("dotenv").config();
const newsRoutes = require("./routes/news");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // Adjust for production use
    methods: ["GET", "POST"],
  },
});
app.use(
  cors({
    origin: "*", // Allow requests from any origin (you can restrict this later)
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(
  cors({
    origin: "http://localhost:5173", // Only allow requests from your frontend
  })
);
// Middleware

app.use(express.json());

// Swagger API Documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Socket.io Connection
io.on("connection", (socket) => {
  console.log("New client connected:", socket.id);
  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

// Make Socket.io accessible in routes
app.use((req, res, next) => {
  req.io = io;
  next();
});

// API Routes
app.use("/api/news", newsRoutes);

// Connect to MongoDB

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log(" Connected to MongoDB"))
  .catch((error) => console.error(" MongoDB Connection Error:", error));
