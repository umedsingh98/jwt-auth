import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors'
import connectToMongo from './db.js';
import router from './routes/authRouter.js';
import env from "dotenv";

env.config();

const app = express();
connectToMongo();

const PORT = process.env.PORT || 8080;

app.get("/ping", (req,res) => {
  res.send("PONG");
})

app.use(bodyParser.json());
app.use(cors());
app.use('/auth',router);

app.listen(PORT,()=>{
  console.log(`Server Is Running On ${PORT} PORT`);
}); 