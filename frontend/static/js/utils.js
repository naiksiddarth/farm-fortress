import { refreshToken } from "./refreshToken.js"

const checkRes = async function (res) {
    if (res.status === 401){
        refreshToken()
        return null
    }
    return res
}

// wrap these around something that will handel access token expiration itself
export const getLoggedInUser = async function (BACKEND_URL) {
    let res = await fetch(`${BACKEND_URL}/auth/user`,{
        credentials: "include"
    })
    let data = await res.json()
    if(data.message === "Access token expired"){
        console.log(data)
        await refreshToken()
        res = await fetch(`${BACKEND_URL}/auth/user`, {
        credentials: "include"
    })
        data = await res.json()
        console.log(data)
    }
    if(res.ok){
        return data
    }
    return null
}

export const getFarmData = async function (BACKEND_URL) {
    let res = await fetch(`${BACKEND_URL}/farm`, {
        credentials: "include"
    })
    let data = await res.json()
    if(data.message === "Access token expired"){
        console.log(data)
        await refreshToken()
        res = await fetch(`${BACKEND_URL}/farm`, {
        credentials: "include"
    })
        data = await res.json()
        console.log(data)
    }
    if(data.message === "Farm not found"){
        return null
    }
    return data
}