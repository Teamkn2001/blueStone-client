import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import ContactSection from './ContactSection';
import { requestOTP } from '@/APIs/authAPI';

export default function PasswordResetForm() {
  const [email, setEmail] = useState('');
  const [verifyCode, setVerifyCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [tokenSent, setTokenSent] = useState(false); // Set to true to show all fields initially

  const handleSendToken = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Reset token requested for:", email);
    // Add your send token logic here
    try {
      const sendToken = await requestOTP(email);
      if (sendToken.status == "success") {
        alert(`Token sent to ${email}`);
        setTokenSent(true); // Set to true to show all fields
      }
    } catch (error) {
      alert("Error sending token. Please try again.");
      console.error("Token send error:", error);
    }
  };

  const handleSubmitReset = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Password reset submitted:", { 
      email, 
      verifyCode, 
      newPassword, 
      confirmPassword 
    });
    // Add your password reset submission logic here
  };

  return (
    <>
      <h2 className="text-xl font-bold text-center mb-6">Forgot Password</h2>
      
      <form onSubmit={tokenSent ? handleSubmitReset : handleSendToken} className="space-y-4">
        {/* Email field - always editable */}
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-gray-300 rounded-sm px-3 py-2 mb-4"
          placeholder="Email"
        />
        
        {/* Send Reset Token Button - always available */}
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
              type="text"
              value={verifyCode}
              onChange={(e) => setVerifyCode(e.target.value)}
              className="w-full border border-gray-300 rounded-sm px-3 py-2 mb-4"
              placeholder="Verify Code"
            />
            
            {/* New Password field */}
            <Input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-sm px-3 py-2 mb-4"
              placeholder="New Password"
            />
            
            {/* Confirm Password field */}
            <Input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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