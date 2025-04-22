import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ContactSection from "./ContactSection";
import { requestOTP, resetPassword } from "@/APIs/authAPI";
import { useNavigate } from "react-router-dom";

export default function PasswordResetForm() {
  const [resetPwForm, setResetPwForm] = useState({
    email: "",
    verifyCode: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [tokenSent, setTokenSent] = useState(false); // Set to true to show all fields initially
  const navigate = useNavigate();

  const handleSendToken = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Reset token requested for:", resetPwForm.email);
    // Add your send token logic here
    const userEmail = {
      email: resetPwForm.email,
    };
    try {
      const sendToken = await requestOTP(userEmail);
      if (sendToken.status == "success") {
        alert(`Token sent to ${resetPwForm.email}`);
        setTokenSent(true); // Set to true to show all fields
      }
    } catch (error : any) {
      alert("Error sending token. Please try again." + "  " + error.response?.data?.msg);
      console.error("Token send error:", error.response?.data?.msg);
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setResetPwForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmitReset = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Password reset submitted:", {
      email: resetPwForm.email,
      verifyCode: resetPwForm.verifyCode,
      newPassword: resetPwForm.newPassword,
      confirmPassword: resetPwForm.confirmPassword,
    });
    
    const resetData = {
      email: resetPwForm.email,
      verifyCode: resetPwForm.verifyCode,
      newPassword: resetPwForm.newPassword,
      confirmPassword: resetPwForm.confirmPassword,
    }

    try {
      const resetPwd = await resetPassword(resetData);
      if (resetPwd.status == "success") {
        alert(`Password reset successful`);
        navigate("/login"); 
      }

    } catch (error : any) {
      alert(`Error resetting password. Please try again. Error : ${error.response?.data?.msg}`);
      console.error("Password reset error:", error.response?.data?.msg);
    }
  };

  return (
    <>
      <h2 className="text-2xl font-bold text-center mb-6">Forgot Password</h2>

      <form
        onSubmit={tokenSent ? handleSubmitReset : handleSendToken}
        className="space-y-4"
      >
        <Input
          name="email"
          type="email"
          value={resetPwForm.email}
          onChange={(e) => onChange(e)}
          className="w-full border border-gray-300 rounded-sm px-3 py-2 mb-4"
          placeholder="Email"
        />

        <Button
          type={tokenSent ? "button" : "submit"}
          onClick={tokenSent ? handleSendToken : undefined}
          className="w-full bg-[#125D87] hover:bg-[#0D4362] text-white rounded-sm py-2 mb-8"
        >
          Send Reset Token
        </Button>

        {tokenSent && (
          <>
            {/* Verify Code field */}
            <Input
              name="verifyCode"
              type="text"
              value={resetPwForm.verifyCode}
              onChange={(e) => onChange(e)}
              className="w-full border border-gray-300 rounded-sm px-3 py-2 mb-4"
              placeholder="Verify Code"
            />

            {/* New Password field */}
            <Input
              name="newPassword"
              type="password"
              value={resetPwForm.newPassword}
              onChange={(e) => onChange(e)}
              className="w-full border border-gray-300 rounded-sm px-3 py-2 mb-4"
              placeholder="New Password"
            />

            {/* Confirm Password field */}
            <Input
              name="confirmPassword"
              type="password"
              value={resetPwForm.confirmPassword}
              onChange={(e) => onChange(e)}
              className="w-full border border-gray-300 rounded-sm px-3 py-2 mb-4"
              placeholder="Confirm Password"
            />

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-[#125D87] hover:bg-[#0D4362] text-white rounded-sm py-2 mb-8"
            >
              Submit
            </Button>
          </>
        )}
      </form>

      <ContactSection showSocials={false} />
    </>
  );
}
