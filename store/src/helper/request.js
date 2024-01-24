import axios from 'axios'
import { store } from '../redux/store';
import { setAccessToken } from '../redux/slices/merchantSlice';
import { Save } from './store';
import { api_url } from './constants/api';


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
            const accessToken = store.getState().merchant.accessToken
            const refreshToken = store.getState().merchant.refreshToken
            if (!accessToken || !refreshToken) return { error: "NEW_LOGIN_REQUIRED" }
            try {
                const res = await axios.post(api_url + "auth/token/verify-token", { accessToken, refreshToken })
                const token = res.data.data.accessToken
                await Save("accessToken", token)
                store.dispatch(setAccessToken(token))
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