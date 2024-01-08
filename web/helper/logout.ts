import Request from "./request"

const logout = async () => {
    const accessToken = localStorage.getItem('accessToken')
    const refreshToken = localStorage.getItem('refreshToken')
    const respone = await Request('admin/profile/logout', 'POST', { refreshToken}, accessToken)
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    return respone
}

export default logout