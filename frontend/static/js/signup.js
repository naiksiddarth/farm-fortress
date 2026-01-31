document.addEventListener("DOMContentLoaded", function(){

    const form = document.querySelector('.signup-form')
    const usernameField = document.getElementById("username")
    const emailField = document.getElementById("email")
    const passwordField = document.getElementById("password")
    const confirmPassowrdField = document.getElementById('confirm_password')
    const passwordDoNotMatch = document.getElementById("password_not_match")
    const emailInUse = document.getElementById("email_in_use")
    
    form.addEventListener('submit', async function (event) {
        event.preventDefault()
        const password = passwordField.value
        const confirmPassword = confirmPassowrdField.value
        if (password !== confirmPassword) {
            passwordField.classList.add("invalid_input")
            confirmPassowrdField.classList.add("invalid_input")
            passwordDoNotMatch.classList.remove("hidden")
            return
        }
        let formData = {
            username: usernameField.value.trim(),
            email: emailField.value.trim(),
            password: passwordField.value
        }
        
        const res = await fetch("http://localhost:3001/api/auth/register", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
            
        })
        if(res.ok){
            usernameField.value = ""
            emailField.value = ""
            passwordField.value = ""
            confirmPassowrdField.value = ""
            window.location.assign("/login")
        } else if (res.status === 409){
            passwordField.classList.remove("invalid_input")
            confirmPassowrdField.classList.remove("invalid_input")
            passwordDoNotMatch.classList.add("hidden")
            emailInUse.classList.remove("hidden")
            emailField.classList.add("invalid_input")
        }
    })

})