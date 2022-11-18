import React, { useState } from "react";
import { Link } from "react-router-dom";

const Register = props => {
  const [state, setState] = useState({
    email: "",
    password: "",   
  });

  const handleChange = evt => {
    const { name, value } = evt.target;

    setState(old => ({
      ...old,
      [name]: value,
    }));
  }

  const handleSubmit = evt => {
    evt.preventDefault();

    const { email, password } = state;

  props.onRegister(email, password)
    .catch(err => {
      console.log(`Ошибка: ${err}`);

      setState(old => ({
        ...old,
      }))
    });
  }

  return (
    <div className="register">
      <h1 className="register__title">Регистрация</h1>

      <form onSubmit={handleSubmit} className="register__form">
        <input
          className="register__input" placeholder="Email" name="email" type="email"
          value={state.email} onChange={handleChange} required
        />
      
        <input
          className="register__input" placeholder="Пароль" name="password" type="password"
          value={state.password} onChange={handleChange} required
        />

        <div className="register__button-container">
          <button type="submit" className="register__button">Зарегистрироваться</button>
        </div>
      </form>

      <div className="register__signin">
        <p className="register__signin-text">Уже зарегистрированы?</p>
        <Link to="/sign-in" className="register__signin-link">Войти</Link>
      </div>
    </div>
  );
}

export default Register;