//用户操作相关api
import request from "./request"
import qs from "qs" 
//用户登陆 get请求
export const sendData = (sendDataForm) => {
    return request.get(
        "/todoList",   //访问服务端api接口
        {/*
            params: {
                userphone: sendDataForm.userphone, //传递的参数1
                password: sendDataForm.password,   //传递的参数2
            }, */
            params:{
                sendMassage:sendDataForm
            }
        }
        /* qs.stringify(sendDataForm), */
        /* {
            headers: {
                'Content-Type':'application/json'
            }
        } */
    ).then(function (response) {
        console.log(response);
    })
    .catch(function (error) {
        console.log(error);
    });
}

export const getData = ()=>{
    return request.get(
        '/getData',
    ).then(function (response) {
        console.log(response.data);
        return response.data
    })
    .catch(function (error) {
        console.log(error);
    });
}