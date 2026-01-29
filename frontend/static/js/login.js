document.addEventListener("DOMContentLoaded", function() {
    localStorage.setItem("isLoggedIn", false)

    const emailField = document.getElementById("email")
    const passwordField = document.getElementById("password")
    const loginForm = document.querySelector(".login-form")

    loginForm.addEventListener("submit", async function (event) {
        event.preventDefault()
        const email = emailField.value
        const password = passwordField.value
        const formData = {
            email: email,
            password: password
        }
        const response = await fetch("http://localhost:3001/api/auth/login", {
            method: "POST",
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
                'credentials': 'include'
            },
            body: JSON.stringify(formData)
        })
        if(response.ok){
            localStorage.setItem("isLoggedIn", true)
            renderLoginLogout()
            window.location.assign("/issues")
        }
    })
})