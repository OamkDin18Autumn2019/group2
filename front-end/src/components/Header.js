import React from 'react';
import Navbar from './Navbar';
import styles from '../CSS/Header.module.css';
import menuLogo from '../icons/icons8-menu-50.png';

export default function Header(props) {

    const loggedIn = 0;
    console.log(props.BackdropClickHandler);
    console.log(props.NavbarClickHandler);

    if (loggedIn) {
        return(
            <>
                <Navbar BackdropClickHandler={props.BackdropClickHandler}
                        NavbarState={props.NavbarState}/>
                <header>
                    <div className={styles.GridTemplate}>
                        <div className={styles.Menu}>
                            <button className={styles.ButtonMenu} onClick={props.NavbarClickHandler}> <img src={menuLogo} className={styles.MenuLogo} /> </button>
                        </div>
                        <div className={styles.BrandNameGrid}>
                            <h2 className={styles.BrandName}>mothersellers</h2>
                        </div>
                        <div className={styles.SearchBar}>
                            <input className={styles.SearchBar} placeholder="Search..."/>
                        </div>
                        <div className={styles.SignUp}>
                            <button className={styles.Button}>Register</button>
                        </div>
                        <div className={styles.Login}>
                            <button className={styles.LoginButton}>Login</button>
                        </div>
                    </div>
                </header>
            </>
        )
    } else {
        return(
            <>
                <Navbar BackdropClickHandler={props.BackdropClickHandler}
                        NavbarState={props.NavbarState}/>
                <header>
                    <div className={styles.GridTemplate}>
                        <div className={styles.Menu}>
                            <button className={styles.ButtonMenu} onClick={props.NavbarClickHandler}> <img src={menuLogo} className={styles.MenuLogo} /> </button>
                        </div>
                        <div className={styles.BrandNameGrid}>
                            <h2 className={styles.BrandName}>mothersellers</h2>
                        </div>
                        <div className={styles.SearchBar}>
                            <input className={styles.SearchBar} placeholder="Search..."/>
                        </div>
                        <div className={styles.SignUp}>
                            <button className={styles.Button}>Register</button>
                        </div>
                        <div className={styles.Login}>
                            <button className={styles.LoginButton}>Login</button>
                        </div>
                    </div>
                </header>
            </>
        )
    }
}
