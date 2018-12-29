/**
 * http配置
 */
// 引入axios以及vant中的loading和message组件
import axios from 'axios'
import qs from 'qs'
import { Toast } from 'vant';
import router from './routes/routes'
let baseUrl = '/erp-store-api'
// 超时时间
axios.defaults.timeout = 10000
// http请求拦截器
axios.interceptors.request.use(config => {
    //  Toast.loading({
    //   mask: true,
    //   message: '加载中...',
    //   duration: 0
    // });
    return config
}, error => {
    Toast.clear();
    Toast('加载失败');
    return Promise.reject(error)
})
// http响应拦截器
axios.interceptors.response.use(response => {// 响应成功关闭loading
    Toast.clear();
    return response
}, error => {
    if (error.response.status == 403) {
        Toast('登录信息已过期，请重新登录');
        localStorage.removeItem('membershipCardId')
        localStorage.removeItem('memberId')
        localStorage.removeItem('token')
        setTimeout(() => {
            router.push({ path: '/login', replace: true })
        }, 1000)
    } else {
        Toast('加载失败');
    }
    return Promise.reject(error)
})

export default {
    //常用的POST和GET请求
    post(url, data, config) {
        let configs = { headers: { 'Content-Type': 'application/x-www-form-urlencoded', } }
        var arr = Object.keys(data)
        return axios.post(baseUrl + url, arr.length == 0 ? data : qs.stringify(data), config == undefined ? configs : config)
    },
    get(url, data) {
        return axios.get(baseUrl + url, { params: data })
    },
}