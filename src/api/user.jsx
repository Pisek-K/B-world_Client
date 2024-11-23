import axios from "axios";


export const createUserCart = async (token,cart) => await axios.post("http://localhost:8000/user/cart",cart,{
    headers:{
        Authorization: `Bearer ${token}` 
    }
})


export const createUserOrder = async (token,payload) => await axios.post("http://localhost:8000/user/order",payload,{
    headers:{
        Authorization: `Bearer ${token}`
    }
})

export const getOrder = async (token) => await axios.get("http://localhost:8000/user/order",{
    headers:{
        Authorization: `Bearer ${token}`
    }
})


export const saveOrder = async (token,payload) => {
    return axios.post('http://localhost:8000/user/order',
        payload,
         {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

