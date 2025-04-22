import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ContactSection from "./ContactSection";
import { registerUser } from "@/APIs/authAPI";
import { useNavigate } from "react-router-dom";

export default function RegisterForm() {
  const [registerForm, setRegisterForm] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
  });

  const navigate = useNavigate();

  const [isSubmitted, setIsSubmitted] = useState(false);

  const isFieldEmpty = (value: string) => {
    return value.trim() === "";
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsSubmitted(true);

    if (
      isFieldEmpty(registerForm.username) ||
      isFieldEmpty(registerForm.password) ||
      isFieldEmpty(registerForm.confirmPassword) ||
      isFieldEmpty(registerForm.email)
    ) {
      alert("Please fill in all fields.");
      return;
    }

    // Check if passwords match
    if (registerForm.password !== registerForm.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    const registerData = {
      username: registerForm.username,
      password: registerForm.password,
      confirmPassword: registerForm.confirmPassword,
      email: registerForm.email,
    };
    console.log("Registration submitted:", registerData);

    try {
      const register = await registerUser(registerData);
      console.log(register);
      if (register.status == "success" ) {
        alert(`Register success`);
      }
      navigate('/login')
    } catch (error : any) {
      alert("Registration failed. Please try again." + " "+error?.response?.data?.msg);
      console.error("Registration error:", error.response?.data?.msg);
    }
  };

  const getInputClass = (value : string) => {
    const baseClass = "w-full border rounded-sm px-3 py-2";
    if (isSubmitted && isFieldEmpty(value)) {
      return `${baseClass} border-red-500 focus:ring-red-500 focus:border-red-500`;
    }
    return `${baseClass} border-gray-300`;
  };

  return (
    <>
      <h2 className="text-2xl font-bold text-center mb-8">Register</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Username field */}
        <Input
          name="username"
          type="text"
          value={registerForm.username}
          onChange={(e) => onChange(e)}
          className={getInputClass(registerForm.username)}
          placeholder="Username"
        />

        {/* Password field */}
        <Input
          name="password"
          type="password"
          value={registerForm.password}
          onChange={(e) => onChange(e)}
          className={getInputClass(registerForm.password)}
          placeholder="Password"
        />

        {/* Confirm Password field */}
        <Input
          name="confirmPassword"
          type="password"
          value={registerForm.confirmPassword}
          onChange={(e) => onChange(e)}
          className={getInputClass(registerForm.confirmPassword)}
          placeholder="Confirm Password"
        />

        {/* Email field */}
        <div className="relative mb-6">
          <Input
            name="email"
            type="email"
            value={registerForm.email}
            onChange={(e) => onChange(e)}
            className={getInputClass(registerForm.email)}
            placeholder="Email"
          />
        </div>

        {/* Register Button */}
        <Button
          type="submit"
          className="w-full bg-[#125D87] hover:bg-[#0D4362] text-white rounded-sm py-2 mb-8 "
        >
          Register
        </Button>
      </form>

      <ContactSection showSocials={true} />
    </>
  );
}
