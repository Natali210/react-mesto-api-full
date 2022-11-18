import React from "react";
import logo from "../images/header-logo.svg";
import { Link } from "react-router-dom";
import { Route, Switch } from "react-router-dom";

const Header = props => { 
  const { logout, userEmail } = props;

  return (
    <header className="header root__header">
      <img className="header__logo" src={logo} alt="Лого" />
        <Switch>
          <Route path="/sign-up">
            <Link to="/sign-in" className="header__button">Войти</Link>
          </Route>
          <Route path="/sign-in">
            <Link to="sign-up" className="header__button">Регистрация</Link>
          </Route>
          <Route path="/">
            <div className="header__current-user">
              <p className="header__email">{userEmail}</p>
                <Link to="/sign-in" className="header__button" onClick={logout}>Выйти</Link>
            </div>
          </Route>
        </Switch>
    </header>
  );  
}

export default Header;