import axios from 'axios'


export default (path, method, params={}, data={}, responseType = 'json' )=> {
    return axios({
        method: method,
        url:`${path}`,
        baseURL:"http://localhost:3001/",
        data: data,
        responseType:responseType,
        headers:{
            "Authorization": 'whatever-you-want'
        },
        params:params
    })
}