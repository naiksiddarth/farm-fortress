document.addEventListener("DOMContentLoaded", (e) => {
    renderLoginLogout()
})

const renderLoginLogout = function () {
    const navButtons = document.querySelector(".nav-buttons")
    const loginButton = document.getElementById("login-header-button")
    const signupButton = document.getElementById("signup-header-button")
    const logoutButton = document.createElement("div")
    logoutButton.innerHTML = `
    <div id="logout-header-button">    
        <a href="/logout" >
            <div class="menu-item highlighted">
                <p>Logout</p>
            </div>
        </a>
    </div>
    `
    if(localStorage.getItem("isLoggedIn") === "true") {
        navButtons.removeChild(loginButton)
        navButtons.removeChild(signupButton)
        navButtons.appendChild(logoutButton)
    }
}