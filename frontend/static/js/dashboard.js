const BACKEND_URL = "http://localhost:3001/api"
const errorModal = document.getElementById("error-modal")

const initDashboard = async function () {
    const userData = await fetchData()

}

async function fetchData() {

    try {
        console.log(errorModal.children[0].children);
        const response = await fetch(`${BACKEND_URL}/farm`, {
            credentials: "include"
        })
        
        if (response.status === 401) {
            errorModal.children[0].children[0].innerHTML = "Unauthorized"
            errorModal.children[0].children[1].innerHTML = "Please login or signup before accessing this page"
            errorModal.children[0].children[2].textContent = "Login"
            errorModal.children[0].children[2].onclick = () => window.location.assign("/login")

            return null
        }
        else {

        }
        errorModal.style.display = "none"
        const data = await response.json()
        return data.data
    } catch (error) {
        console.error("Fetch error:", error)
        return null
    }
}

document.addEventListener("DOMContentLoaded", function () {
    initDashboard()
})