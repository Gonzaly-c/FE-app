// import { api } from "../services/api.js";

// export const loginService = async (email, password) => {

//   const res = await api.post('/auth/login', {user: {email, password}}, {withCredentials: true})
  
//   const { id , role } = res.data.userData

//   const user = {id, role}

//   return user

// }

export const logoutService = () => {
  localStorage.removeItem('token')
}

export const getToken = () => localStorage.getItem('token')