const BACKEND_URL = "http://localhost:3001/api"
const errorModal = document.getElementById("error-modal")

const initDashboard = async function () {
    const userData = await fetchData()
    
}

async function fetchData() {
    const response = await fetch(`${BACKEND_URL}/farm`)
    console.log(response.ok)
    
    if(!response.ok){
        return
    }
    errorModal.style.display = "none"
    const data = await response.json()
    return data.data
}

document.addEventListener("DOMContentLoaded", function () {
    initDashboard()
})