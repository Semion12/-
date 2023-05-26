import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import authRouter from './routes/authRouter.js'
import postsRouter from './routes/postRouter.js'
import path from 'path'
dotenv.config()
const app = express()
app.use('/images', express.static(path.join('images')))
app.use(express.json())
app.use('/auth', authRouter)
app.use('/posts',  postsRouter)


const PORT = process.env.PORT 
const MONGO_URL = process.env.MONGO_URL 


mongoose.connect(MONGO_URL).then(()=>{
    console.log('db ok')
})
app.listen(PORT, ()=>{
    console.log('server started')
})