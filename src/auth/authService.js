import { api } from "../services/api.js";

export const loginService = async (emailToLogin, password) => {
  const res = api.post('/auth/login', {emailToLogin, password})
  const { token , email, role } = res.data

  const user = {email, role}

  localStorage.setItem('token', token)
  return user
}

export const logoutService = () => {
  localStorage.removeItem('token')
}

export const getToken = () => localStorage.getItem('token')