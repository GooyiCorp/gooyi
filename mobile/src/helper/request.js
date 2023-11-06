import axios from "axios";
import { api_url } from "../constants/api";
import { Get, Save} from "./store.js"
async function getToken() {
    return await Get("accessToken")
}
async function getRefreshToken() {
    return await Get("refreshToken")
}

async function Request(url, method, data, token = false) {
    url = api_url + url
    const access_token = token ? await getToken() : null
    try {
        const res = await axios.request({
            url: encodeURI(url),
            headers: access_token ? {
                Authorization: "Bearer " + access_token
            } : null,
            method,
            data
        })
        console.log(res.data)
        return res.data
    } catch (error) {
        const err = {
            success: error.response.data.success,
            status: error.response.status,
            message: error.response.data.message
        }
        if (err.message == "jwt expired.") {
            console.log("Refresh token");
            let requireLogin = false
            const accessToken = await getToken()
            const refreshToken = await getRefreshToken()
            if (!(accessToken && refreshToken)) requireLogin = true
            try {
                const res = await axios.post(api_url + "auth/verify-token",{accessToken, refreshToken})
                await Save("access_token", res.data.data.accessToken)
                return Request(url, method, data, token=true)
            } catch (error) {
                if (error.response.data.message == "Unauthorzied.") {
                    requireLogin = true
                }
            }
        }
        if (requireLogin) return {error: "NEW_LOGIN_REQUIRED"}
        console.log(err)
        return err
    }
}
export default Request