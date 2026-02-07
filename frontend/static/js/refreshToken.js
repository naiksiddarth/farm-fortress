export const refreshToken = async () => {
    const res = await fetch("http://localhost:3001/api/auth/refresh-token", {
        method: "POST",
        credentials: "include"
    })
    return
}