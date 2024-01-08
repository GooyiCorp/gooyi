import { api_url } from "@/constant"
import axios from "axios"

async function Request(path:string, method:string, data:any, token:string|null|boolean) {
    const url = api_url + path
    const access_token = token ? token : null
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
            const accessToken = typeof window !== "undefined" ? window.localStorage.getItem('accessToken') : false
            const refreshToken = typeof window !== "undefined" ? window.localStorage.getItem('refreshToken') : false
            if (!accessToken || !refreshToken) return { error: "NEW_LOGIN_REQUIRED" }
            try {
                const res = await axios.post(api_url + "auth/token/verify-token", { accessToken, refreshToken })
                const token = res.data.data.accessToken
                if (typeof window !== 'undefined') window.localStorage.setItem('accessToken', token)
                const response = await Request(path, method, data, token)
                return response
            } catch (error) {
                if (error.response.data.message == "Unauthorzied.") {
                    return { error: "NEW_LOGIN_REQUIRED" }
                }
            }
        }
        return err
    }
}
export default Request