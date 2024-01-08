import Request from "./request"

const logout = async () => {
    const accessToken = typeof window !== "undefined" ? window.localStorage.getItem('accessToken') : false
    const refreshToken = typeof window !== "undefined" ? window.localStorage.getItem('refreshToken') : false
    const respone = await Request('admin/profile/logout', 'POST', { refreshToken}, accessToken)
    if (typeof window !== "undefined") {
        window.localStorage.removeItem('accessToken')
        window.localStorage.removeItem('refreshToken')
    }
    return respone
}

export default logout