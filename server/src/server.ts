import Express from "express";
import userRoutes from "./infrastructure/http/routes/User-routes";
import csvRouter from "./infrastructure/http/routes/Csv-routes";
import { WebSocketServer } from "./infrastructure/websocket/WebSocketServer";

const app =  Express();
const wss = new WebSocketServer(8081)
app.use(Express.json());
app.use("/api",userRoutes)
app.use("/api",csvRouter(wss))
app._router.stack.forEach((middleware: any) => {
  if (middleware.route) {
    console.log(`Rota carregada: ${middleware.route.path}`);
  }
});

app.listen(8000,()=> console.log("Servidor Ativo"));