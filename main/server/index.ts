import express from "express";
import cors from "cors";
import { Server } from "http";
import SocketIo from "./socket";

const server = express();
const app = new Server(server)
export const io = (new SocketIo(app)).io;

let port = 5683;

server.use(cors({
    origin: "*",
    credentials: true,
}));

server.get("/test", (req, res) => {
    res.send("Hello World");
});

app.listen(port, () => console.log(`Listening on port ${port}`));

import "../launchpad/index";