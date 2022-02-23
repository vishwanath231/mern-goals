import express from "express";
import morgan from "morgan";
import colors from 'colors';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import goalRouter from './routes/goalRouter.js';
import userRouter from './routes/userRouter.js';
import errorHandler from './middlewares/errorMiddleware.js'


dotenv.config()

// MongoDB connection
connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }))

app.use(cors());

if (process.env.NODE_ENV === 'development') {
    app.use(morgan("dev"))
}

app.use('/api/users', userRouter);
app.use('/api/goals', goalRouter);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
    PORT, 
    console.log(`server running on ${process.env.NODE_ENV} mode port ${process.env.PORT}`.yellow.underline)
);
