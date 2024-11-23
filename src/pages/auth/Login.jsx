import React, { useState } from "react";
import { toast } from "react-toastify";
import useEcomStore from "../../store/ecom-store";
import { useNavigate, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { loginGoogle } from "@/api/auth";
import { assert } from "joi";

const Login = () => {
  const actionLogin = useEcomStore((state) => state.actionLogin);
  const actionLoginGoogle = useEcomStore((state) => state.actionLoginGoogle);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const hdlLoginGoogle =  useGoogleLogin({
    onSuccess: async (codeResponse) => {
      const res = await actionLoginGoogle(codeResponse)
      console.log("check res function --> ",res)
      // console.log("check res -->",res.data)
      // console.log(codeResponse)
      navigate("/user/profile");
  },onError:(err)=>{
    console.log(err)
  }})
    
  
  const hdlOnChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const hdlSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await actionLogin(form);
      const role = res.data.payload.role;
      roleRedirect(role);
      toast.success("Login successfully");
    } catch (err) {
      const errMsg = err.response?.data?.err;
      toast.error(errMsg);
    }
  };

  const roleRedirect = (role) => {
    if (role === "ADMIN") {
      navigate("/admin");
    } else {
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen bg-cyan-200 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={hdlSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={hdlOnChange}
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={form.password}
                onChange={hdlOnChange}
                placeholder="Enter your password"
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Login
            </Button>
            <button onClick={()=>hdlLoginGoogle()} type="submit" className="w-full">
              Login Google
            </button>
          </form>
          <div className="mt-4 text-center">
            <span>Not registered? </span>
            <Link to="/register" className="text-blue-600 hover:underline">
              Create an account
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;