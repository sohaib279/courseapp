import express from "express"
import dotenv, { config } from "dotenv"
import mongoose from "mongoose"
import cookieParser from "cookie-parser";
import { v2 as cloudinary } from 'cloudinary';
import courseRoute from "./routes/course.route.js"
import userRoute from "./routes/user.route.js"
import adminRoute from "./routes/admin.route.js"
import orderRoute from "./routes/order.route.js"
import fileUpload from "express-fileupload";
import cors from "cors"


dotenv.config()
const app = express()

const port = process.env.PORT || 3000
const DB_URI= process.env.MONGO_URI

try {
    await mongoose.connect(DB_URI)
    console.log("Connected to MongoDB")
} catch (error) {
    console.error(error)
}

//middelware
app.use(express.json())
app.use(cookieParser())
app.use(cors({
  origin: "https://courseapp-seven.vercel.app",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}))

app.use(fileUpload({
  useTempFiles : true,
  tempFileDir : '/tmp/'
}));

  // Cloudinary Configuration code
  cloudinary.config({ 
    cloud_name: process.env.cloud_name ,
    api_key: process.env.api_key ,
    api_secret: process.env.api_secret ,
}); 
  // test route
  app.get('/', (req, res) => {
    res.send('Hello from Express on Vercel!');
  });
  
//defining routes
app.use("/api/v1/course",courseRoute)
app.use("/api/v1/user",userRoute)
app.use("/api/v1/admin",adminRoute)
app.use("/api/v1/order",orderRoute)


app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})

