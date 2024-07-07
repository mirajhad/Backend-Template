import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser";
import logger from './utils/logger.js';
import morgan from 'morgan';

const morganFormat = ':method :url :status :response-time ms';
const app = express()


app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true
}))

app.use(express.json({limit: "100kb"}))
app.use(express.urlencoded({extended: true, limit: "100kb"}))
app.use(express.static("public"))
app.use(cookieParser())

app.use(morgan(morganFormat, {
  stream: {
    write: (message) => {
      const logObject = {
        method: message.split(' ')[0],
        url: message.split(' ')[1],
        status: message.split(' ')[2],
        responseTime: message.split(' ')[3],

      };
      logger.info(JSON.stringify(logObject));
    }
  }
}));


// routes import

import healthCheck from "./routes/health.routes.js"




//routes declarations

app.use("/",healthCheck)




export {app}