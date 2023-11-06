import axios from "axios";
import { api_url } from "../constants/api";
import { Get, Save} from "./store.js"
async function getToken() {
    return await Get("accessToken")
}
async function getRefreshToken() {
    return await Get("refreshToken")
}

async function Request(path, method, data, token = false) {
    const url = api_url + path
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
        return res.data
    } catch (error) {
        const err = {
            success: error.response.data.success,
            status: error.response.status,
            message: error.response.data.message
        }
        if (err.message == "jwt expired.") {
            const accessToken = await getToken()
            const refreshToken = await getRefreshToken()
            if (!(accessToken && refreshToken)) return {error: "NEW_LOGIN_REQUIRED"}
            try {
                const res = await axios.post(api_url + "auth/verify-token",{accessToken, refreshToken})
                await Save("accessToken", res.data.data.accessToken)
                return Request(path, method, data, token=true)
            } catch (error) {
                if (error.response.data.message == "Unauthorzied.") {
                    return {error: "NEW_LOGIN_REQUIRED"}
                }
            }
        }
        return err
    }
}
export default Request