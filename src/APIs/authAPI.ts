import { LoginForm, RegisterForm, ResetPasswordForm } from '@/types/userType';
import axios from '../configs/axios';

export const registerUser = async (userData : RegisterForm) => {
    try {
        const res = await axios.post('/auth/register', userData)

        return res.data;
    } catch (error) {
        console.error('Error registering user:', error);
        throw error; 
        
    }
}

export const loginUser = async (userData : LoginForm) => {
    try {
        const res = await axios.post('auth/login', userData)

        return res.data;
    } catch (error) {
        console.error('Error logging in user:', error);
        throw error;
    }
}

export const requestOTP = async (email : any) => {
    try {
        console.log(`email at requestOTP: ${email}`)
        const res = await axios.post('/auth/request-token', email)

        return res.data;
    } catch (error) {
        console.error('Error requesting OTP:', error);
        throw error; 
        
    }
}

export const resetPassword = async (resetData : ResetPasswordForm) => {
    try {
        const res = await axios.post('/auth/reset-password', resetData)
        
        return res.data;
    } catch (error) {
        console.error('Error resetting password:', error);
        throw error;
    }
}