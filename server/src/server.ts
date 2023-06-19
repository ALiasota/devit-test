import express, { NextFunction, Request, Response } from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import { config } from 'dotenv'
import cron from 'node-cron'
import postRouter from './routes/api/posts'
import parseRSSFeed from 'utils/prcer'
import authRouter from 'routes/api/auth'
const app = express()
config()
app.use(cors())
app.use(express.json())
app.use('/api/posts', postRouter)
app.use('/api/auth', authRouter)

const port = process.env.PORT || 5001
app.use((_: Request, res: Response) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((err: TypeError, _: Request, res: Response, _1: NextFunction) => {
  res.status(500).json({ message: err.message })
})
;(async () => {
  await parseRSSFeed()
})()
cron.schedule('*/10 * * * *', async () => await parseRSSFeed())

mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => {
    console.log('MongoDB Connected...')
  })
  .catch(err => console.log('Erroor', err))

app.listen(port, () => {
  console.log(`Server running. Use our API on port: ${port}`)
})
