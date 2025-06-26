import express from 'express'
import User from '../models/userinfo.js'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
dotenv.config()

const secret = process.env.JWT_SECRET
const router = express.Router()


router.post('/signup', async (req, res)=>{
    const {name, email, password} = req.body

    try{
       const existinguser = await User.findOne({email})

       if(existinguser) return res.status(400).json({message: 'User with this email already exists'})
       const hashedpass = await bcrypt.hash(password, 10) 

       const user = new User({name, email, password:hashedpass})
       await user.save()

       res.status(200).json({message: 'User registration successful!'})

    } catch(error){
        console.log('some error:', error.message)
        res.status(500).json({message: error.message})
    }
})

router.post('/signin', async (req, res)=>{
    const {email, password} = req.body
    try{

        const user = await User.findOne({email})
        if (!user) return res.status(400).json({ message: 'User not found' });
        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) return res.status(401).json({message:'Invalid credentials'})
        const token = jwt .sign({userId: user._id}, secret, {expiresIn:'1h'} )

        res.status(200).json({message: 'login successful', token})
    } catch (error){
        res.status(500).json({message: error.message})
    }
})

export default router