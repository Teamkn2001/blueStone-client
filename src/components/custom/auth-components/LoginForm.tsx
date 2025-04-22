import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import ContactSection from "./ContactSection";
import { loginUser } from "@/APIs/authAPI";

export default function LoginForm({ setMode }: { setMode: React.Dispatch<React.SetStateAction<"register" | "login" | "reset">>} ) {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [rememberMe, setRememberMe] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login submitted:", { username, password, rememberMe });

    const loginData = {
      username: username,
      password: password,
    };

    try {
      const login = await loginUser(loginData);
      if (login.status == "success") {
        alert(`Login success`);
      }
    } catch (error) {
      alert("Login failed. Please check your credentials.");
      console.error("Login error:", error);
    }
  };

  return (
    <>
      <h2 className="text-xl font-semibold text-center mb-8">Login</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Username field */}
        <div className="mb-4">
          <Input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full border border-gray-300 rounded-sm px-3 py-2"
            placeholder="Username"
          />
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
            <div className="w-4 h-4 border-r border-b border-gray-300 transform rotate-45 bg-white"></div>
          </div>
        </div>

        {/* Password field with label */}
        <div className="mb-4">
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded-sm px-3 py-2"
            placeholder="Password"
          />
        </div>

        {/* Remember Me checkbox */}
        <div className="flex items-center space-x-2 mb-6">
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

        {/* Login Button */}
        <Button
          type="submit"
          className="w-full bg-[#125D87] hover:bg-[#0D4362] text-white rounded-sm py-2"
        >
          Login
        </Button>

        {/* Forgotten Password Link */}
        <div className="text-center mt-4 cursor-pointer" onClick={() => setMode("reset")}>
          <p className="text-xs text-blue-500 underline">
            Forgotten password?
          </p>
        </div>
      </form>

      <ContactSection showSocials={true} />
    </>
  );
}
