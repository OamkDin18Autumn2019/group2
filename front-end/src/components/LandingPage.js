import React from 'react';
import Header from './Header';
import Footer from './Footer';
import styles from '../CSS/LandingPage.module.css';
import WelcomePhoto from '../images/da.jpg'
import Link from "react-router-dom";
import { FaChartPie, FaGlobe, FaCog, FaUsers } from 'react-icons/fa';
import { IconContext } from "react-icons";
import classNames from 'classnames';

export default function LandingPage(props) {

    console.log(props);
    console.log(window.scrollY);

    return (
        <React.Fragment>
            <div className={styles.wrapper}>
             <Header > </Header>
                <section className={styles.topContainer}>
                    <header className={styles.showCase}>
                        <h1> We can sell everything</h1>
                        <p> Lorem ipsum dolor sit amet,
                            consectetur adipiscing elit.
                            Curabitur nec gravida massa.
                        Aenean ut libero. </p>
                        <a href="#" className={styles.btn}> Get started </a>
                    </header>
                    <div className={classNames(styles.topBoxA, styles.topBox) }>
                        <h5> Your mum</h5>
                        <p className={styles.price}> $0.01</p>
                        <a href="" className={styles.btn}> Buy Now </a>
                    </div>
                    <div className={classNames(styles.topBoxB, styles.topBox) }>
                        <h5> iMam XI pro</h5>
                        <p className={styles.price}> $3000</p>
                        <a href="" className={styles.btn}> Buy Now </a>
                    </div>
                </section>

                <section className={styles.boxes}>
                    <div className={styles.box}>
                        <IconContext.Provider value={{ size: "4em" }}>
                       <FaChartPie />
                          <h3> Just </h3>
                          <p> Lorem Lorem ipsum dolor sit amet,
                            consectetur adipiscing elit.
                            Curabitur </p>
                        </IconContext.Provider>                        
                    </div>

                    <div className={styles.box}>
                        <IconContext.Provider value={{ size: "4em" }}>
                       <FaGlobe />
                          <h3> Stupid </h3>
                          <p> Lorem Lorem ipsum dolor sit amet,
                            consectetur adipiscing elit.
                            Curabitur </p>
                        </IconContext.Provider>                        
                    </div>

                    <div className={styles.box}>
                        <IconContext.Provider value={{ size: "4em" }}>
                       <FaCog />
                          <h3> Words </h3>
                          <p> Lorem Lorem ipsum dolor sit amet,
                            consectetur adipiscing elit.
                            Curabitur </p>
                        </IconContext.Provider>                        
                    </div>

                    <div className={styles.box}>
                        <IconContext.Provider value={{ size: "4em" }}>
                       <FaUsers />
                          <h3> Here </h3>
                          <p> Lorem Lorem ipsum dolor sit amet,
                            consectetur adipiscing elit.
                            Curabitur </p>
                        </IconContext.Provider>                        
                    </div>
                </section>

                <section className={styles.info}>
                    
                        <img src="https://images.pexels.com/photos/975250/pexels-photo-975250.jpeg?auto=compress&cs=tinysrgb&h=650&w=940" alt=""/>
                        <div>
                        <h2> Your Sellings on the MotherSellers</h2>
                        <p> Lorem, ipsum dolor sit amet consectetur 
                            adipisicing elit. Cum, omnis odit 
                            provident saepe, repudiandae quo dolore 
                            ab officiis veniam quibusdam velit nesciunt
                             ut atque. Eum eos illo saepe magni vitae!
                        </p>
                        <a href="#" className={styles.btn}> Buy something now! </a>

                        </div>

                </section>
                <section className={styles.portfolio}>
                    <img src="https://source.unsplash.com/random/200x200" alt="img"/>
                    <img src="https://source.unsplash.com/random/200x201" alt="img"/>
                    <img src="https://source.unsplash.com/random/200x203" alt="img"/>
                    <img src="https://source.unsplash.com/random/200x204" alt="img"/>
                    <img src="https://source.unsplash.com/random/200x205" alt="img"/>
                    <img src="https://source.unsplash.com/random/200x206" alt="img"/>
                    <img src="https://source.unsplash.com/random/200x207" alt="img"/>
              </section>
              <footer>
                  <p>Kislenko Dmitrii &copy; 2019</p>
              </footer>
            </div>

        </React.Fragment>
    )
}