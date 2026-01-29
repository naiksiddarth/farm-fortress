const form = document.querySelector('.signup-form')
const usernameField = document.getElementById("username")
const emailField = document.getElementById("email")
const passwordField = document.getElementById("password")
const confirmPassowrdField = document.getElementById('confirm_password')

form.addEventListener('submit', async function (event) {
    event.preventDefault()
    const password = passwordField.value
    const confirmPassword = confirmPassowrdField.value
    if (password !== confirmPassword) {
        alert('Passwords do not match!')
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
        alert("succesfully created user")
        window.location.assign("/login")
    } else {
        alert("Cannot create user. Please try again")
    }
})

