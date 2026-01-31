import express from "express"
import { fileURLToPath } from "url";
import path, { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const static_folder = path.join(__dirname, 'static')

const app = express()
app.use(express.static(static_folder))

app.get("/api/healthcheck", (req, res) => {
    res.status(200)
    res.send()
})

app.get("/", (req, res) => {
    res.sendFile(path.join(static_folder, "html/landingpage.html"))
})

app.get("/dashboard", (req, res) => {
    res.sendFile(path.join(static_folder, "html/dashboard.html"))
})

app.get("/login", (req, res) => {
    res.sendFile(path.join(static_folder, "html/login.html"))
})

app.get("/signup", (req, res) => {
    res.sendFile(path.join(static_folder, "html/signup.html"))
})

app.listen(3000, () => {
    console.log(`Started server on http://localhost:3000`)
})