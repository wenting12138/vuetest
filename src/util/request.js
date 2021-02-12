import axios from "axios"

// 创建一个axios实列
const service = axios.create({
    // 请求超时时间
    timeout: 3000,
})

export default service;