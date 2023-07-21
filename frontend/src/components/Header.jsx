import logo from '../images/mesto_logo.svg'
import { Routes, Route } from 'react-router-dom';

function Header({email, handleSignout}) {
  return (
    <header className="header">
      <img src={logo} alt="логотип" className="header__logo"/>
        <Routes>
          <Route path="/" element={<span className='header__mail'>{email}<a onClick={handleSignout} href="/sign-in" className="header__link">Выйти</a></span>} />
          <Route path="/sign-up" element={<a href="/sign-in" className="header__link">Войти</a>} />
          <Route path="/sign-in" element={<a href="/sign-up" className="header__link">Регистрация</a>} />
        </Routes> 
    </header>
  );
}

export default Header;