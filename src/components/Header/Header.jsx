import React from 'react';
import style from './Header.module.css';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <div
      className={style.headerContainer}
      style={{
        background: '#ffffff',
        boxShadow: '0px 4px 10px 0px #00000040',
      }}
    >
      <Link to={'/'} className={style.button}>
        Home
      </Link>
      <Link to={'/movies'} className={style.button}>
        Movies
      </Link>
    </div>
  );
}
