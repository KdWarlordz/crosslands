import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const connectDB = async () => {
  console.log('Connecting to MongoDB')
  if (mongoose.connection.readyState === 0) {
    const username = process.env.MONGODB_USERNAME
    const password = process.env.MONGODB_PASSWORD
    const host = process.env.MONGODB_HOST
    const port = process.env.MONGODB_PORT
    const dbname = process.env.MONGODB_DBNAME
    const uri = `mongodb://${username}:${password}@${host}:${port}/${dbname}?authSource=admin`

    try {
      await mongoose.connect(uri, {
        useUnifiedTopology: true,
        useNewUrlParser: true
      } as mongoose.ConnectOptions)

      console.log('MongoDB connected successfully')
    } catch (error) {
      console.error('MongoDB connection error:', error)
    }
  }
}

export default connectDB
