import axios from "axios";

export const createCategory = async (token,form) => await axios.post("http://localhost:8000/category",form,{
    headers:{
        Authorization: `Bearer ${token}` 
    }
})

export const listCategory = async () => await axios.get("http://localhost:8000/category")


export const removeCategory = async (token,id) => await axios.delete('http://localhost:8000/category/'+id,{
    headers:{
        Authorization: `Bearer ${token}` 
    }
})


