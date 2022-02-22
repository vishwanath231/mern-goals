import mongoose from 'mongoose';

const connectDB = async () => {

    try{
        const conn = await mongoose.connect(process.env.MONGO_URI);

        console.log(`Mongodb connected: ${conn.connection.host}`.white.underline);

    }catch(err){

        console.log(`Mongodb error: ${conn.connection.host}`.red.underline);
        process.exit(1);
    }
}

export default connectDB;