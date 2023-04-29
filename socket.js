import { Server } from "socket.io";

import MessageModel from "./dao/models/message.js";

let io;

export const init = (httpServer) => {
  io = new Server(httpServer);

  io.on("connection", async (socketClient) => {
    console.log("Nuevo cliente conectado", socketClient.id);

    socketClient.on("new-message", async (data) => {
      const message = await MessageModel.create(data);
      io.emit("notification", mensaje);
    });
    socketClient.on("disconection", () => {
      console.log("Se desconecto el cliente con el id", socketClient.id);
    });
  });
};

export const emit = (message) => {
  io.emit("notification", message);
};
