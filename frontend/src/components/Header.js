import '../styles/Header.css';
import React from 'react';


function Header () {
    return(
        <header>
            <h1>Hospital</h1>
            <nav>
                <ul class="header-list">
                    <li class="header-item">
                        <a href="#"> Surgeries </a>
                    </li>
                    <li class="header-item">
                        <a href="#"> Surgeons </a>
                    </li>
                    <li class="header-item"> 
                        <a href="#"> Leaderboard </a>
                    </li>
                </ul>
            </nav>
        </header>
    );

}

export default Header;