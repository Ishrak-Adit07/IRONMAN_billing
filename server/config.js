import dotenv from 'dotenv';
dotenv.config();

const MONGODB_URL = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_URL}/?retryWrites=true&w=majority&appName=${process.env.MONGODB_APP_NAME}`;

export { MONGODB_URL };
