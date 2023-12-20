import axios from "axios";
import { api_url } from "../constants/api";
import { Get, Save} from "./store.js"
import { store } from "../redux/store.js";
import { setToken } from "../redux/slices/userSlice.js";

async function Request(path, method, data, token) {
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
            const accessToken = store.getState().user.accessToken
            const refreshToken =  store.getState().user.refreshToken
            if (!accessToken || !refreshToken) return {error: "NEW_LOGIN_REQUIRED"}
            try {
                const res = await axios.post(api_url + "auth/verify-token",{accessToken, refreshToken})
                const token = res.data.data.accessToken
                await Save("accessToken", token)
                store.dispatch(setToken(token))
                const response = await Request(path, method, data, token)
                return response
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