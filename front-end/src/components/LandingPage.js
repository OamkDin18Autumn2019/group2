import React from 'react';
import Header from './Header';
import styles from '../CSS/LandingPage.module.css';
import { FaChartPie, FaGlobe, FaCog, FaUsers } from 'react-icons/fa';
import { IconContext } from "react-icons";
// import product from './Product'
import Product from './Product';
// import classNames from 'classnames';
// import Footer from './Footer';
// import WelcomePhoto from '../images/da.jpg'
// import Link from "react-router-dom";

export default function LandingPage(props) {

    // console.log(props);
    // console.log(window.scrollY);

    return (
        <React.Fragment>
            <div className={styles.wrapper}>
             <Header /> 
                <section className={styles.topContainer}>
                    <div className={styles.showCase}>
                        <h1> We can sell everything</h1>
                        <p> Lorem ipsum dolor sit amet,
                            consectetur adipiscing elit.
                            Curabitur nec gravida massa.
                        Aenean ut libero. </p>
                        <a href="#" className={styles.btn}> Get started </a>
                    </div>
                </section>
                {/* <h2> Our products </h2> */}
                <section className={styles.products}>
                    <Product >https://source.unsplash.com/random/200x200</Product> 
                    <Product >https://source.unsplash.com/random/201x200</Product> 
                    <Product >https://source.unsplash.com/random/202x200</Product> 
                    <Product >https://source.unsplash.com/random/203x200</Product> 
                    <Product >https://source.unsplash.com/random/204x200</Product> 
                    <Product >https://source.unsplash.com/random/205x200</Product> 
                    <Product >https://source.unsplash.com/random/206x200</Product> 
                    <Product >https://source.unsplash.com/random/207x200</Product> 
                    <Product >https://source.unsplash.com/random/208x200</Product> 
                    <Product >https://source.unsplash.com/random/209x200</Product> 
                    <Product >https://source.unsplash.com/random/210x210</Product> 
                    <Product >https://source.unsplash.com/random/211x220</Product> 
                    <Product >https://source.unsplash.com/random/212x230</Product> 

                </section>

                <section className={styles.middleContainer}>
                    <header className={styles.showCaseMiddle}>
                        <h1>We are universal</h1>
                        <p> Lorem ipsum dolor sit amet,
                            consectetur adipiscing elit.
                            Curabitur nec gravida massa.
                        Aenean ut libero. </p>
                        <a href="#" className={styles.btn}> Buy now </a>
                    </header>
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
                    
                        <img src="https://images.pexels.com/photos/2317408/pexels-photo-2317408.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" alt=""/>
                        <div>
                        <h2> Start now</h2>
                        <p> Lorem, ipsum dolor sit amet consectetur 
                            adipisicing elit. Cum, omnis odit 
                            provident saepe, repudiandae quo dolore 
                            ab officiis veniam quibusdam velit nesciunt
                             ut atque. Eum eos illo saepe magni vitae!
                        </p>
                        <a href="#" className={styles.btn}> Buy something now! </a>

                        </div>

                </section>
              
              {/* <footer>
                  <p>Kislenko Dmitrii &copy; 2019</p>
              </footer> */}

              <Footer />
            </div>

        </React.Fragment>
    )
}