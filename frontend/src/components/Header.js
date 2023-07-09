import React from "react";
import logo from "../images/logo.svg";
import { Link, Route, Routes } from "react-router-dom";

function Header({ onLogOut, emailHeader, isOpen, menuOpen }) {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <nav
              className={` ${
                isOpen ? "header__nav_mob-active" : "header__nav-mob"
              }`}
            >
              <p className="header__email">{emailHeader}</p>
              <Link
                to="sign-in"
                className="header__exit"
                onClick={onLogOut}
              >
                Выйти
              </Link>
            </nav>
          }
        />
      </Routes>
      <header className="header">
        <img className="header__logo" src={logo} alt="Логотип" />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <button
                  className={`${
                    isOpen
                      ? "header__menu-closed"
                      : "header__menu-open"
                  }`}
                  type="button"
                  onClick={menuOpen}
                />
                <nav className="header__nav">
                  <p className="header__email">{emailHeader}</p>
                  <Link
                    to="sign-in"
                    className="header__exit"
                    onClick={onLogOut}
                  >
                    Выйти
                  </Link>
                </nav>
              </>
            }
          />

          <Route
            path="/sign-in"
            element={
              <Link to="/sign-up" className="header__link">
                Регистрация
              </Link>
            }
          />

          <Route
            path="/sign-up"
            element={
              <Link to="/sign-in" className="header__link">
                Войти
              </Link>
            }
          />

          <Route
            path="/"
            element={
              <nav className="header__nav">
                <p className="header__email">{emailHeader}</p>
                <Link to="sign-in" className="header__exit" onClick={onLogOut}>
                  Выйти
                </Link>
              </nav>
            }
          />
        </Routes>
      </header>
    </>
  );
}

export default Header;
