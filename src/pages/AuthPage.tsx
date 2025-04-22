import React, { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import bluestoneBG from "@/assets/bg-office.png";
import bluestoneIcon from "@/assets/logo2.png";
import RegisterForm from "@/components/custom/auth-components/RegisterForm";
import LoginForm from "@/components/custom/auth-components/LoginForm";
import PasswordResetForm from "@/components/custom/auth-components/PasswordResetForm";

export default function AuthPage() {
  const [mode, setMode] = useState<"register" | "login" | "reset">("register");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-100 to-gray-200">
      <div className="absolute inset-0 z-0">
        {/* Background image will go here */}
        <div
          className="w-full h-full bg-cover bg-center opacity-50"
          style={{ backgroundImage: `url(${bluestoneBG})` }}
        />
      </div>

      <Card className="w-96 shadow-lg z-10 bg-white rounded-md">
        <CardHeader className="flex justify-center pb-2">
          <img src={bluestoneIcon} alt="Bluestone Logo" />
        </CardHeader>

        <CardContent>
          {mode === "register" && <RegisterForm setMode={setMode}/>}
          {mode === "login" && <LoginForm setMode={setMode}/>}
          {mode === "reset" && <PasswordResetForm />}
        </CardContent>
      </Card>

      {/* Bluestone logo watermark on the right side */}
      <div className="absolute right-10 top-1/2 transform -translate-y-1/2 opacity-20 hidden lg:block">
        <img
          src="/path-to-your-logo.png"
          alt="Bluestone Watermark"
          className="w-64"
        />
      </div>
    </div>
  );
}
