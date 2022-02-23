import express from "express";
import morgan from "morgan";
import colors from 'colors';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import goalRouter from './routes/goalRouter.js';
import userRouter from './routes/userRouter.js';
import errorHandler from './middlewares/errorMiddleware.js'

// env
dotenv.config()

// MongoDB connection
connectDB();

const app = express();

// Express middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }))

// cors => Cross Origin Resource Sharing
app.use(cors());

// morgan for development mode
if (process.env.NODE_ENV === 'development') {
    app.use(morgan("dev"))
}

// router
app.use('/api/users', userRouter);
app.use('/api/goals', goalRouter);

// Error handler
app.use(errorHandler);

// Port
const PORT = process.env.PORT || 5000;

// App listen
app.listen(
    PORT, 
    console.log(`server running on ${process.env.NODE_ENV} mode port ${process.env.PORT}`.yellow.underline)
);
