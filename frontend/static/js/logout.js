document.addEventListener("DOMContentLoaded", async function () {
    const response = await fetch("http://localhost:3001/api/auth/logout", {
            method: "POST",
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
                'credentials': 'include'
            }
        })
    if(response.ok){
        window.location.replace("/login")
    }
}) 