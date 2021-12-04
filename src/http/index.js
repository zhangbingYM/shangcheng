import axios from 'axios'

// 二次封装axios 
export default function (config){
    const myaxios = axios.create({
        baseURL:process.env.VUE_APP_BASE_URL,
        // timeout: 1000,
    })

    //添加请求拦截
    myaxios.interceptors.request.use(
        function(config){
           console.log(config);
           if(config.url!='/login'){
               config.headers.Authorization=sessionStorage.getItem('token');
           }
           return config;
        },
        function(error){
            return Promise.reject(error)
        }
    )

    // 添加响应拦截器
    myaxios.interceptors.response.use(
        function(response){
            return response.data
        },
        function(error){
            return Promise.reject(error)
        }
    )

    return myaxios(config)
}