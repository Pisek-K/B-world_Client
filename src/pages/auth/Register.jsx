import React, { useState } from "react";
import { toast } from "react-toastify";
import validateRegister from "../../utils/validators";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import axios from "axios";

const initialState = {
  email: "",
  password: "",
  confirmPassword: "",
};

const Register = () => {
  const [form, setForm] = useState(initialState);
  const [formErrors, setFormErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const hdlOnChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const hdlSubmit = async (e) => {
    e.preventDefault();
    const error = validateRegister(form);
    if (error) {
      return setFormErrors(error);
    }

    try {
      const res = await axios.post("http://localhost:8000/auth/register", form);
      toast.success(res?.data);

      setForm(initialState);
      setFormErrors({});
    } catch (err) {
      const errMsg = err.response?.data?.err;
      toast.error(errMsg);
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-bottom"
      style={{ backgroundImage: "url('/bookshelf.jpg')" }}
    >
      <Card className="w-[350px] bg-[#E6D2AA] ">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Register
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={hdlSubmit} className="space-y-4">
            <div className="space-y-2">
              <Input
                name="email"
                onChange={hdlOnChange}
                value={form.email}
                type="text"
                placeholder="Email"
              />
              {formErrors.email && (
                <p className="text-sm text-red-500">{formErrors.email}</p>
              )}
            </div>

            <div className="space-y-2">
              <div className="relative">
                <Input
                  name="password"
                  onChange={hdlOnChange}
                  value={form.password}
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
              {formErrors.password && (
                <p className="text-sm text-red-500">{formErrors.password}</p>
              )}
            </div>

            <div className="space-y-2">
              <div className="relative">
                <Input
                  name="confirmPassword"
                  onChange={hdlOnChange}
                  value={form.confirmPassword}
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm password"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
              {formErrors.confirmPassword && (
                <p className="text-sm text-red-500">
                  {formErrors.confirmPassword}
                </p>
              )}
            </div>

            <Button type="submit" className="w-full">
              Register
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;
