import http from "http";
import { Server } from "socket.io";

const initializeSocket = (server: http.Server) => {
  const io: Server = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });
  return io;
};

export { initializeSocket };