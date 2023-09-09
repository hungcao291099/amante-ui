import axios from 'axios';
import jwtDecode from 'jwt-decode';

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

const token = getCookie("member_access_token")
var userdata = null

if(token && token !== "" && token !== null && token !== undefined && token !== "undefined") {
    userdata = jwtDecode(token)
}

const api = axios.create({



    baseURL: 'https://shopping.amante.co.kr:3010/v1.0'
    // baseURL: 'http://localhost:3010/v1.0', // path to your API, which will be resolved by the proxy
    // baseURL: 'http://192.168.80.6:3010/v1.0', // path to your API, which will be resolved by the proxy
});




api.defaults.params = {}
api.defaults.params["cust_seq"] = userdata ? userdata.cust_seq : undefined


api.interceptors.request.use((config) => {
    // Add any request headers here, if needed
    return config;
});

export default api;