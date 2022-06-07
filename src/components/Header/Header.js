import React from 'react';
import logo from '../../images/iconic-logos_black.png'
import './Header.css'

const Header = () => {
      return (
            <div className='header'>
                  <img src={logo} alt="" />
                  <nav>
                        <a href="/shop">Shop</a>
                        <a href="/review">Order Review</a>
                        <a href="/inventory">Manage Inventory</a>

                  </nav>
            </div>
      );
};

export default Header;