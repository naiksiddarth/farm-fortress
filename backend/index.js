import app from './app.js';
import { connectDB } from "./db/connect.db.js"

connectDB()
    .then(() => {
        app.listen(process.env.BACKEND_PORT, () => {
            console.log(`Listening on http://localhost:${process.env.BACKEND_PORT}`)
        })
    })