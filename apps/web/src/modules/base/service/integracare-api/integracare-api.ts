import axios from 'axios'

const integracareApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8080',
  withCredentials: true,
  withXSRFToken: true,
})

export default integracareApi
