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
            <Header NavbarClickHandler={props.NavbarClickHandler}
                    NavbarState={props.NavbarState} 
                    BackdropClickHandler={props.BackdropClickHandler}
                    backgroundColor={props.backgroundColor}
                    />
                <div className={styles.LPbody}>
                    <div className={styles.WelcomeBlock}>
                        <div className={styles.WelcomeBlockPhoto}>
                            <div className={styles.GetStarted}>
                                <h3 className={styles.WelcomeText}> We can sell anything. <br></br> Even your mother. </h3>
                                <h4 className={styles.GetStartedText}>We can help you sell your mother.</h4>
                                <h1 className={styles.SellHer}>Sell her.</h1>
                                <button className={styles.GetStartedButton}> GET STARTED </button>
                            </div>
                            <img src={WelcomePhoto} />
                        </div>
                    </div>
                    <div className={styles.ProductsCategories}>
                        <div>
                            
                        </div>
                    </div>
                </div>
            <Footer />
        </React.Fragment>
    )
}