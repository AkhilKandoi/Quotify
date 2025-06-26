import express from 'express'
import cors from 'cors'
import authRoutes from './routes/auth.js'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'
dotenv.config()


const secret = process.env.JWT_SECRET
const uri = process.env.MONGODB_URI
mongoose.connect(uri)
    .then(()=>{console.log('mongodb connected')})
    .catch(err=>console.error('mongodb connection failed: ', err))

 const app = express()
app.use(cors({
    origin: ['http://localhost:5173'],
    credentials: true,
}))
app.use(express.json())
app.use('/api/auth', authRoutes)
const PORT = process.env.PORT || 4590


const authMiddleware = (req, res, next) =>{
    const authHeader = req.headers.authorization

    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return res.status(401).json({message: 'Unauthorized: no token'})
    }
    const token = authHeader.split(' ')[1]
    try{
        const decoded = jwt.verify(token, secret)
        req.user = decoded
        next()
    } catch (error){
        res.status(403).json({message: 'invalid or expired token'})
    }
} 

app.get('/home', authMiddleware, (req, res)=>{
    res.status(200).json({ message: 'Quote page' });
})

app.listen(PORT, ()=>{
    console.log(`listening to on http://localhost:${PORT}`)
})