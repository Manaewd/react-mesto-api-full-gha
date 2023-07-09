import React, { useState } from "react";

function Login({ onLogin }) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleEmailChange(e){
    setEmail(e.target.value)
  }

  function handlePasswordChange(e){
    setPassword(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault()

    onLogin({email, password})
  }

  return (
      <form className="auth__form" onSubmit={handleSubmit}>
      <h1 className="auth__title">Вход</h1>
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
        <button type="submit" className="auth__button" aria-label="Логин">
          Войти
        </button>
      </form>
  );
}

export default Login;