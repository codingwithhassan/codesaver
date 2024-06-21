import express from 'express';
import cors from 'cors';
import cookieparser from 'cookie-parser';

const app = express();
cors({
    orgin: process.env.CORS_ORIGIN,
    credentials: true
}),

app.use(express.json({limit: '16kb'}))
app.use (express.urlencoded({limit:'16kb',extended:true})) 
app.use(cookieparser());
app.use(express.static('public'));
import userRouter from './routes/user.routes.js';
app.use('/api',userRouter);
export{app}

