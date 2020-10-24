import axios from 'axios';
export function request(config) {
    // 1.创建axios实例
    const instance = axios.create({
        baseURL: 'http://152.136.185.210:8000/api/w6',
        timeout: 8000
    });
    // 2.axios请求拦截器
    // 请求的结果不符合服务器的要求
    // 网络加载图标
    // 判断是否传递token,不然的话就转到登录页面
    instance.interceptors.request.use(config => {
        // console.log(config);
        return config;
    }, err => {
        console.log(err);
    })
    instance.interceptors.response.use(res => {
        // console.log(res);
        return res.data;
    }, err => {
        console.log(err);
    })


    // 3.发送网络请求
    return instance(config);
}