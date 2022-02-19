import React from "react";
import { Link, useLocation } from "react-router-dom";
import './NavBar.css';

export const NavBar = () => {
  const { pathname } = useLocation();

  return(
    <header className="navBar_wrapper">
      <nav className="navBar">
        <h1>MetroTune</h1>

        <ul className="navBar__list">
          <li className={`navBar__list_item ${pathname === '/' ? 'active' : ''}`}>
            <Link to='/'>
              Metronome
            </Link>
          </li>
          <li className={`navBar__list_item ${pathname === '/tuner' ? 'active' : ''}`}>
            <Link to='/tuner'>
              Tuner
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
};
