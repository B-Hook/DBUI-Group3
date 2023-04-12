import './Header.css';
import React from 'react';
import { AppContext } from "../../AppContext";
import { useContext } from 'react';

function Header () {
    const appContext = useContext(AppContext);
    return(
        <header class="nav-header">
            <h1 class="title-header">Hospital</h1>
            <span>{ appContext.userName }</span>&nbsp;
            <button onClick={() => {appContext.setUserName(undefined);
                                    appContext.setUserType(undefined);} }>Logout</button>
            <nav>
                <ul class="header-list">
                    <li class="header-item">
                        <a href="/surgery"> View Surgery </a>
                    </li>
                    <li class="header-item">
                        <a href="/new-surgery"> New Surgery </a>
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