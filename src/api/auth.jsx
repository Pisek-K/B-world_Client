import axios from "axios";

export const currentUser = async (token) => await axios.post("http://localhost:8000/auth/current-user",{},{
    headers:{
        Authorization: `Bearer ${token}`
    }
})

export const loginGoogle = async (profile) => {
  console.log(profile)
  return await axios.post("http://localhost:8000/auth/register-google",profile)
} 

export const currentAdmin = async (token) => await axios.post("http://localhost:8000/auth/current-admin",{},{
    headers:{
        Authorization: `Bearer ${token}`
    }
})


  export const updateAddress = async (token,data) => {
    const header = {
      headers: { Authorization: `Bearer ${token}` }
    };
    return await axios.put('http://localhost:8000/user/address', data, header);
  };
