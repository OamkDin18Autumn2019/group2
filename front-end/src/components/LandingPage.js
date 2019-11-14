import React from 'react';
import Header from './Header';
import Footer from './Footer';
import styles from '../CSS/LandingPage.module.css';
import WelcomePhoto from '../images/da.jpg'
import Link  from "react-router-dom";

export default function LandingPage(props) {

    console.log(props);
    console.log(window.scrollY);

    return(
        <React.Fragment>
         <div className={ styles.wrapper }>
            <nav className={styles.mainNav}>
                <ul>
                    <li> <a href="#">Home</a></li>
                    <li> <a href="#">Contact</a></li>
                    <li> <a href="#">Help</a></li>
                    <li> <a href="#"> Mother</a></li>
                </ul>
            </nav>
            <section>
                
            </section>
         </div>       
          
        </React.Fragment>
    )
}