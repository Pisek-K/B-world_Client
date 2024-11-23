import axios from "axios";


export const createProduct = async (token,form) => await axios.post("http://localhost:8000/product",form,{
    headers:{
        Authorization: `Bearer ${token}` 
    }
})

export const listProduct = async (count = 30) => await axios.get('http://localhost:8000/product/products/'+count)

export const readProduct = async (token,itemId) => await axios.get('http://localhost:8000/product/'+itemId,{
    headers:{
        Authorization: `Bearer ${token}` 
    }
})

export const removeProduct = async (token,id) => await axios.delete('http://localhost:8000/product/'+id,{
    headers:{
        Authorization: `Bearer ${token}` 
    }
})

export const updateProduct = async (token,id,form) => await axios.put('http://localhost:8000/product/'+id,form,{
    headers:{
        Authorization: `Bearer ${token}` 
    }
})


export const uploadFiles = async (token,form) => await axios.post("http://localhost:8000/product/images",{
    image: form
},{
    headers:{
        Authorization: `Bearer ${token}` 
    }
})

export const removeFiles = async (token,public_id) => await axios.post("http://localhost:8000/product/removeimages",{
    public_id
},{
    headers:{
        Authorization: `Bearer ${token}` 
    }
})


export const searchFilters = async (arg) => await axios.post('http://localhost:8000/product/search/filters',arg)