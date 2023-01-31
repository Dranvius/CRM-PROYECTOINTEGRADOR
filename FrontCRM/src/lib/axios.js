import axios from 'axios'
import {useAuthStore} from '../storage/globalStorage.js'

const authApi = axios.create({
    baseURL: "http://localhost:3000", //Cambiar en product
    withCredentials: true
})

authApi.interceptors.request.use(config =>{

    const token = useAuthStore.getState().token;
    
    config.headers ={
        Authorization: token
    }
    
    return config
})


export default authApi;