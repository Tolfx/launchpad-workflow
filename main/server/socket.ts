import { Server } from "socket.io";
import { Server as HttpServer } from "http"
import { IEmits } from "../interfaces/Emits.interfaces";

export default class SocketIo
{
  private server: HttpServer;
  public io: Server<IEmits>

  constructor(server: HttpServer)
  {
    this.server = server;
    this.io = new Server<
        IEmits
    >(server, {
      cors: {
        origin: "*",
        credentials: true,
      }
    });
  }
}