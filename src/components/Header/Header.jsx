import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'

const Header = () => {
    return (
        <nav>
            <Link to='/' >Home</Link>
            <Link to='/register' >Register</Link>
            <Link to='/login' >LogIn</Link>
            <Link to='/registerRBS' >RegisterRBS</Link>
        </nav>
    );
};

export default Header;