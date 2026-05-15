import { LoginCredentials, SignUpCredentials, GoogleLoginCredentials } from "@/type/type";
import axios from "axios";

// Fallback to localhost if env var is not set properly
const BASE_URL = import.meta.env.VITE_BASE_URL;

export const login = async (user: LoginCredentials) => {
    try {
        const res = await axios.post(`${BASE_URL}/login`, user);
        return res.data
    } catch (error) {
        console.log(error)
        return error
    }
}

export const register = async (user: SignUpCredentials) => {
    try {
        const res = await axios.post(`${BASE_URL}/register`, user);
        return res.data
    } catch (error) {
        console.log(error)
        return error
    }
}

export const googleLogin = async (data: GoogleLoginCredentials) => {
    try {
        const res = await axios.post(`${BASE_URL}/google-login`, data);
        return res.data
    } catch (error) {
        console.log(error)
        return error
    }
}
