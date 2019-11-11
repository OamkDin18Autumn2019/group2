import React from 'react';
import styles from '../CSS/Header.module.css';
import menuLogo from '../icons/icons8-menu-50.png';

export default function Header() {

    const loggedIn = 0;

    if (loggedIn) {
        return(
            <>
                <div className={styles.header}>
                    <div className={styles.GridTemplate}>
                        <div className={styles.Menu}>
                            <button className={styles.ButtonMenu}> <img src={menuLogo} className={styles.MenuLogo} /> </button>
                        </div>
                        <div className={styles.BrandNameGrid}>
                            <h2 className={styles.BrandName}>anyStore2019</h2>
                        </div>
                        <div className={styles.SearchBar}>
                            <input className={styles.SearchBar} placeholder="Search..."/>
                        </div>
                        <div className={styles.SignUp}>
                            <button className={styles.Button}>Register</button>
                        </div>
                        <div className={styles.Login}>
                            <button className={styles.Button}>Login</button>
                        </div>
                    </div>
                </div>
            </>
        )
    } else {
        return(
            <>
                 <div className={styles.header}>
                    <div className={styles.GridTemplate}>
                        <div className={styles.Menu}>
                            <button className={styles.ButtonMenu}> <img src={menuLogo} className={styles.MenuLogo} /> </button>
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
                </div>
            </>
        )
    }
}
