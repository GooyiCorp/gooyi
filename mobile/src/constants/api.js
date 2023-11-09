import axios from "axios"
// import { Get } from "../helper/store"
// const getToken = async () => {
//     return await Get('accessToken')
// }
// const Request = new axios.create({
//     baseURL: 'http://gooyi.de:8000/api/'
// })
// Request.interceptors.request.use(
//     async config => {
//         config.headers = { 
//           'Authorization': `Bearer ${getToken()}`,
//           'Accept': 'application/json',
//           'Content-Type': 'application/x-www-form-urlencoded'
//         }
//         return config;
//       },
//       error => {
//         Promise.reject(error)
//       }
// )
// export default Request
export const api_url = "https://piglet-together-wasp.ngrok-free.app/api/"