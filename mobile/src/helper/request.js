import axios from "axios";
import { api_url } from "../constants/api";
import { Get, Save} from "./store.js"
import { store } from "../redux/store.js";
import { setToken } from "../redux/slices/userSlice.js";
async function getToken() {
    return await Get("accessToken")
}
async function getRefreshToken() {
    return await Get("refreshToken")
}

async function Request(path, method, data, token) {
    console.log('A');
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
        console.log('B');
        return res.data
    } catch (error) {
        console.log('C');
        const err = {
            success: error.response.data.success,
            status: error.response.status,
            message: error.response.data.message
        }
        console.log(err.message);
        if (err.message == "jwt expired.") {
            console.log('D');
            const accessToken = store.getState().user.accessToken
            const refreshToken =  store.getState().user.refreshToken
            if (!accessToken || !refreshToken) return {error: "NEW_LOGIN_REQUIRED"}
            try {
                const res = await axios.post(api_url + "auth/verify-token",{accessToken, refreshToken})
                const token = res.data.data.accessToken
                await Save("accessToken", token)
                store.dispatch(setToken(token))
                console.log('E');
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