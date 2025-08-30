import { api } from "../services/api.js";

export const loginService = async (email, password) => {

  const res = await api.post('/auth/login', {email, password})
  
  const { token , role } = res.data.userData

  const user = {token, role}

  localStorage.setItem('token', token)
  return user

}

export const logoutService = () => {
  localStorage.removeItem('token')
}

export const getToken = () => localStorage.getItem('token')