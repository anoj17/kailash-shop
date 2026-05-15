import express from "express";
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';
import cors from 'cors';
import authRoutes from './routes/auth';

dotenv.config();

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(cors({ 
  origin: "*",
//   credentials: true
}));

app.get('/', (req, res) => {
    res.send('server running at port 8000')
})

app.use('/', authRoutes);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

