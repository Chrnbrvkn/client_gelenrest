import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginAsync } from "../../store/features/auth/authThunk";

import './login.css';

export default function Login() {
  const authToken = useSelector((state) => state.auth.token);
  const { register, handleSubmit, reset } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading} = useSelector((state) => state.auth);

  const onSubmit = async (data) => {
    dispatch(loginAsync(data))
      .unwrap()
      .then(() => {
        reset();
        navigate('/admin');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (authToken) {
      navigate('/admin');
    }
  }, [authToken, navigate]);

  return (
    <div className="login-container">
      <h2>Admin Panel</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="login-form">
        <label htmlFor="email">Введите почту</label>
        <input
          id="email"
          type="text"
          placeholder="Почта"
          autoComplete="email"
          {...register("email", { required: "Email is required" })}
        />
        <label htmlFor="password">Введите пароль</label>
        <input
          id="password"
          type="password"
          placeholder="Пароль"
          autoComplete="current-password"
          {...register("password", { required: "Password is required" })}
        />
        <button type="submit" disabled={isLoading}>Login</button>
      </form>
    </div>
  );
}
