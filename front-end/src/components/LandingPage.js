import React from 'react';
import Header from './Header';
import Footer from './Footer';
import styles from '../CSS/LandingPage.module.css';
import Link  from "react-router-dom";

export default function LandingPage(props) {

    console.log(props);

    return(
        <React.Fragment>
            <Header NavbarClickHandler={props.NavbarClickHandler}
                    NavbarState={props.NavbarState} 
                    BackdropClickHandler={props.BackdropClickHandler}/>
                <div className={styles.LPbody}>
                    
                </div>
            <Footer />
        </React.Fragment>
    )
}