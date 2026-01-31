document.addEventListener("DOMContentLoaded", function() {

    const emailField = document.getElementById("email")
    const passwordField = document.getElementById("password")
    const loginForm = document.querySelector(".login-form")
    const errorMsg = document.getElementById("invalid_credentials_error")
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
            window.location.assign("/dashboard")
        }
        else if(response.status === 401){
            errorMsg.classList.remove("hidden")
            emailField.classList.add("invalid_input")
            passwordField.classList.add("invalid_input")
        }
    })
})