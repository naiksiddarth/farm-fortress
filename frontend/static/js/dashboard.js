import { refreshToken } from "./refreshToken.js"

const BACKEND_URL = "http://localhost:3001/api"
const errorModal = document.getElementById("error-modal")
const loadingScreen = document.getElementById("loading-state")

const initDashboard = async function () {
    let [response, data] = await validateData()
    data = data.data
    console.log(data)
    const location = document.getElementById("location")
    const size = document.getElementById("size")
    const soilType = document.getElementById("soilType")
    const waterSource = document.getElementById("waterSource")
    location.textContent = data.farm.location
    size.textContent = `${data.farm.size} ${data.enum[data.farm.sizeUnit]}`
    soilType.textContent = data.enum[data.farm.soilType]
    waterSource.textContent = data.farm.waterSource
}

async function fetchData() {
    const response = await fetch(`${BACKEND_URL}/farm`, {
        credentials: "include"
    })
    const data = await response.json()
    return [response, data]
}

async function validateData() {
    try {
        let [response, data] = await fetchData()
        if (!response.ok) {
            if ( data.message === "Access token expired" ) {
                await refreshToken()
                let [response, data] = await fetchData()
                loadingScreen.style.display = "none"
                return [response, data]
            }
            else {
                errorModal.children[0].children[0].innerHTML = "Unauthorized"
                errorModal.children[0].children[1].innerHTML = "Please login or signup before accessing this page"
                errorModal.children[0].children[2].textContent = "Login"
                errorModal.children[0].children[2].onclick = () => window.location.assign("/login")
                errorModal.style.display = "flex"
            }
        }
        errorModal.style.display = "none"
        loadingScreen.style.display = "none"
        return [response, data]
    } catch (error) {
        console.error("Fetch error:", error)
        errorModal.style.display = "flex"
        return null
    }
}

document.addEventListener("DOMContentLoaded", function () {
    initDashboard()
})