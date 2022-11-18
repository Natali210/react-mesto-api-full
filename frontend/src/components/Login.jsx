import React, { useState } from "react";

const Login = props => {
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
  };

  const handleSubmit = evt => {
    evt.preventDefault();

    const { email, password } = state;

    if (!email || !password) return;

    props.onLogin(email, password)
      .then(() => {
        setState({
          email: "",
          password: "",
        });
      })
      .catch(err => {
        console.log(`Ошибка: ${err}`);
        setState(old => ({...old}));
      })
  }

  return (
    <div className="login">
      <h1 className="login__title">Вход</h1>
      <form onSubmit={handleSubmit} className="login__form">
        <input
          className="login__input" placeholder="Email" name="email" type="email"
          value={state.email} onChange={handleChange} required
        />

        <input
          className="login__input" placeholder="Пароль" name="password" type="password"
          value={state.password} onChange={handleChange} required
        />

        <div className="login__button-container">
          <button className="login__button" type="submit">Войти</button>
        </div>
      </form>
    </div>
  );
}

export default Login;