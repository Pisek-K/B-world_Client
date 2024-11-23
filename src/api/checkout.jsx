import axios from 'axios';

export const createPaymentIntent = async (token) => await axios.post("http://localhost:8000/checkout/create-payment-intent",{},{
    headers:{
        Authorization: `Bearer ${token}`
    }
})