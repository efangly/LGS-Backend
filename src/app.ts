import express, { Express } from "express";
import { Server } from "socket.io";
import http, { createServer } from "http";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import { initializeSocket } from "./utils/network";
dotenv.config();

const app: Express = express();
const server: http.Server = createServer(app);
const port: number = Number(process.env.PORT);

app.use(express.json());
app.use(cors({ origin: "*" }));
app.use(morgan("dev"));

const io: Server = initializeSocket(server);

io.on("connection", (socket) => {
  console.log(`User : ${socket.id} Connected!!`);
  socket.on("send_message", (data) => {
    socket.broadcast.emit("send_cmd", data);
  });
  socket.on("receive_message", (data) => {
    socket.broadcast.emit("res_message", data);
  });
  socket.on("disconnect", () => {
    console.log(`User : ${socket.id} Disconnected!!`);
  });
});

app.get('/api', (req,res) => {
  res.json({ msg: "test" });
});

server.listen(port, () => console.log(`Start Server On Port : ${port}`));






