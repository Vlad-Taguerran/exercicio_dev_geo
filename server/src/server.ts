import Express from "express";
import 'reflect-metadata';
import userRoutes from "./infrastructure/http/routes/user.routes";
import csvRouter from "./infrastructure/http/routes/csv.routes";
import { WebSocketServer } from "./infrastructure/websocket/WebSocketServer";
import { connectDB } from "./infrastructure/database/sequelize";
import authRoute from "./infrastructure/http/routes/auth.routes";
import addressRoute from "./infrastructure/http/routes/address.routes";
import sseRouter from "./infrastructure/http/routes/sse.routes";
import cors from 'cors';
import fileRoutes from "./infrastructure/http/routes/file.routes";
import { errorHandler } from "./infrastructure/middlewares/errorHandler";
import { DataInitializer } from "./infrastructure/start/dataInitializer";
const dataInitializer = new DataInitializer();

const app =  Express();
const wss = new WebSocketServer(8081)
  wss.start()
    connectDB();
app.use(cors());
app.use(Express.json());
app.use("/event",sseRouter);
app.use("/api",userRoutes);
app.use("/api",addressRoute);
app.use('/api',authRoute);
app.use('/api',csvRouter(wss))
app.use('/api', fileRoutes(wss));
 dataInitializer.run();
app.use(errorHandler);
app._router.stack.forEach((middleware: any) => {
  if (middleware.route) {
    console.log(`Rota carregada: ${middleware.route.path}`);
  }
});

app.listen(8000,()=> console.log("Servidor Ativo"));
