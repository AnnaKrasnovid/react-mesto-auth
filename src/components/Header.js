import LogoVector from '../image/LogoVector.svg';
import { Link, useLocation } from 'react-router-dom';

function Header(props) {
    const location = useLocation()
    //console.log(location)

    function headerLocation() {
        if (location.pathname === '/signin') {
            return <Link to='/signup' className='header__link hover-button'>Регистрация</Link>
        } else if (location.pathname === '/signup') {
            return <Link to='/signin' className='header__link hover-button'>Войти</Link>             
        } else {
            return <Link to='/signin' className='header__link hover-button' onClick={props.logout}>Выйти</Link>
        }
    }

    return (
        <header className='header'>
            <img className='logo' src={LogoVector} alt='Логотип' />
            <div className='header__container'>
            {props.loggedIn ? <p className='header__email'>{props.email}</p> : ''}
               {headerLocation()}
            </div>
        </header>
    )
}

export default Header;
