import React, { useState } from "react";
import { Link, Route } from "react-router-dom";

function Register({ loggedIn, onRegister }) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (loggedIn) {
    return <Route to="/" />;
  }

  function handleEmailChange(e){
    setEmail(e.target.value)
  }

  function handlePasswordChange(e){
    setPassword(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault()
    onRegister({email, password})
  }

  return (
      <form className="auth__form" onSubmit={handleSubmit}>
      <h1 className="auth__title">Регистрация</h1>
        <label>
          <input
            // id="email"
            onChange={handleEmailChange}
            type="email"
            name="email"
            autoComplete="email"
            placeholder="Email"
            className="auth__input"
            required
            value={email || ""}
          ></input>
        </label>
        <label>
          <input
            // id="password"
            onChange={handlePasswordChange}
            autoComplete="new-password"
            required
            type="password"
            name="password"
            placeholder="Пароль"
            className="auth__input"
            value={password || ""}
          ></input>
        </label>
        <button type="submit" className="auth__button" aria-label="Логин">
          Зарегистрироваться
        </button>
      <div className="container-link">
        <Link to="/sign-in" className="auth__link">
          Уже зарегистрированы? Войти
        </Link>
      </div>
      </form>
  );
}

export default Register;