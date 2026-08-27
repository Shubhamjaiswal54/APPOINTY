import dotenv from 'dotenv';
dotenv.config();
console.log(process.env.RAZORPAY_KEY_ID);


import express from 'express'
import cors from 'cors'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import adminRouter from './routes/adminRoute.js'
import doctorRouter from './routes/doctorRoute.js'
import userRouter from './routes/userRoute.js'
import mongoose from 'mongoose'


// app config
const app = express()
const port = process.env.PORT || 4000

// Connect to database (CALL THE FUNCTION)
connectDB()
connectCloudinary()

// middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

// Log all requests to /api/admin/login
app.use((req, res, next) => {
  if (req.path === '/api/admin/login') {
    console.log('\n=== INCOMING ADMIN LOGIN REQUEST ===')
    console.log('Path:', req.path)
    console.log('Method:', req.method)
    console.log('Headers:', JSON.stringify(req.headers, null, 2))
    console.log('Body:', JSON.stringify(req.body, null, 2))
    console.log('=== END REQUEST ===\n')
  }
  next()
})

app.use('/api/admin/login', (req, res, next) => {
  console.log('ADMIN LOGIN ROUTE HANDLER REACHED')
  console.log('Request body in route:', req.body)
  next()
})

// api endpoints
app.use('/api/admin', adminRouter)
app.use('/api/doctor', doctorRouter)
app.use("/api/user", userRouter)


app.get("/", (req, res) => {
  res.send("API Working")
});

app.get('/test-db', (req, res) => {
  const state = mongoose.connection.readyState;
  // 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting
  if (state === 1) {
    res.send('Database is connected');
  } else {
    res.status(500).send('Database is NOT connected');
  }
});


app.listen(port, () => console.log(`Server started on PORT:${port}`))
