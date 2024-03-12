import { useForm } from "react-hook-form";
import { signIn } from "../../api/usersApi";
import { useData } from "../../contexts/DataProvider";
import { useEffect } from "react";

import './login.css'


import { useNavigate } from 'react-router-dom'

export default function Login() {
  const { register, handleSubmit, reset } = useForm()
  const { login } = useData()
  const navigate = useNavigate()

  useEffect(() => {
    console.log(login);
  }, [login])
  const onSubmit = async (data) => {
    try {
      console.log(data);
      const response = await signIn(data)
      console.log(response);
      await login(response.token)
      reset()
      navigate('/admin')
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="login-container">
      <h2>Admin Panel</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="login-form">
        <label htmlFor="email">Введите почту</label>
        <input
          id="email"
          type="text"
          placeholder="Почта"
          {...register("email", { required: "Email is required" })}
        />

        <label htmlFor="password">Введите пароль</label>
        <input
          id="password"
          type="password"
          placeholder="Пароль"
          {...register("password", { required: "Password is required" })}
        />

        <button type="submit">Login</button>
      </form>
    </div>
  )
}