import express from "express"
import { fileURLToPath } from "url";
import path, { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const static_folder = path.join(__dirname, 'static')

const app = express()
app.use(express.static(static_folder))


app.listen(3000, () => {
    console.log(`Started server on http://localhost:3000`)
})