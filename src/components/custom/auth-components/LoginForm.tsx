import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import ContactSection from "./ContactSection";
import { loginUser } from "@/APIs/authAPI";
import { useNavigate } from "react-router-dom";

export default function LoginForm( ) {
  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
  });

  const [rememberMe, setRememberMe] = useState(true);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const loginData = {
      username: loginForm.username,
      password: loginForm.password,
      rememberMe: rememberMe,
    };

    try {
      const login = await loginUser(loginData);
      if (login.status == "success") {
        alert(`Login success`);
      }
      // const jwtToken = login.data.user.token; // got token 
    } catch (error : any) {
      alert(`Login failed. Please check your credentials. ${error.response?.data?.msg}`);
      console.error("Login error:", error.response?.data?.msg);
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  return (
    <>
      <h2 className="text-2xl font-bold text-center mb-8">Login</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Username field */}
        <div className="mb-4">
          <Input
          name="username"
            type="text"
            value={loginForm.username}
            onChange={(e) => onChange(e)}
            className="w-full border border-gray-300 rounded-sm px-3 py-2"
            placeholder="Username"
          />
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
            <div className="w-4 h-4 border-r border-b border-gray-300 transform rotate-45 bg-white"></div>
          </div>
        </div>

        <div className="mb-4">
          <Input
            name="password"
            id="password"
            type="password"
            value={loginForm.password}
            onChange={(e) => onChange(e)}
            className="w-full border border-gray-300 rounded-sm px-3 py-2"
            placeholder="Password"
          />
        </div>

        {/* Remember Me checkbox */}
        <div className="flex items-center justify-center space-x-2 mb-6">
          <Checkbox
            id="remember-me"
            checked={rememberMe}
            onCheckedChange={(checked) => setRememberMe(checked as boolean)}
            className="border-2 border-blue-500 data-[state=checked]:bg-blue-500"
          />
          <Label
            htmlFor="remember-me"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Remember Me
          </Label>
        </div>

        <Button
          type="submit"
          className="w-full bg-[#125D87] hover:bg-[#0D4362] text-white rounded-sm py-2"
        >
          Login
        </Button>

        {/* Forgotten Password */}
        <div className="text-center my-6 mb-8 cursor-pointer"  onClick={() => navigate("/resetPwd")}>
          <p className="text-xs text-blue-500 underline">
            Forgotten password?
          </p>
        </div>
      </form>

      <ContactSection showSocials={true} />
    </>
  );
}
