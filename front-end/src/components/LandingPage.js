import React from 'react';
import Header from './Header';
import styles from '../CSS/LandingPage.module.css';
import { FaChartPie, FaGlobe, FaCog, FaUsers, FaArrowDown } from 'react-icons/fa';
import { TiArrowDownOutline } from 'react-icons/ti';
import { IconContext } from "react-icons";
import Product from './Product';
import Footer from './Footer';
import axios from 'axios';

export default class LandingPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bestSellers: []
        }
    }
    componentDidMount() {
        let idProduct = parseInt(this.props.match.params.id);
        console.log(this.props.user.token)
        axios.get(`http://localhost:4000/v1/product/da/newArrivals`, {
            headers: {
              'x-access-token':this.props.user.token 
            }
           })
            .then(res => {
                // console.log(this.props.user);
                // console.log(res.data);
                //The following line is to check the response JSON due to the weird structure of the response
                // console.log(res.data.rows[0]);
                if (res.data.rows[0] !== undefined) {
                    this.setState({ bestSellers: res.data.rows });
                    console.log(this.state.bestSellers)
                }

            })
            .catch(err => {
                console.log(err);
                return null;
            })
    }
    render() {

        return (
            <React.Fragment>
                <div className={styles.wrapper}>
                    <Header user={this.props.user} {...this.props}/>
                    <section className={styles.topContainer}>
                        <div className={styles.showCase}>
                            <h1> We can sell everything</h1>
                            <p> Lorem ipsum dolor sit amet,
                                consectetur adipiscing elit.
                                Curabitur nec gravida massa.
                        Aenean ut libero. </p>
                            <a href="#" className={styles.btn}> Get started </a>
                            <div className={styles.arrowDown}>  Read more <br></br><IconContext.Provider value={{ size: "2em", opacity:"20% " }}><TiArrowDownOutline/></IconContext.Provider> </div>

                        </div>
                    </section>
                    {/* <h2> Our products </h2> */}
                    <div className={styles.bestSellersBox}>
                        <div className={styles.bestSellersName}> New arrivals  </div>
                        <section className={styles.products}>
                                {this.state.bestSellers.map((item, i) => (
                                    <Product key={i}  {...item} user = { this.props.user} />
                                  ))}                     
                        </section>
                        {/* </div>
                <div className={styles.bestSellersBox}> */}
                        <div className={styles.bestSellersName}> Best sellers </div>
                        <section className={styles.products}>

                            <Product images="https://source.unsplash.com/random/200x211"/>
                            <Product images="https://source.unsplash.com/random/200x202"/>
                            <Product images="https://source.unsplash.com/random/200x203"/>
                            <Product images="https://source.unsplash.com/random/200x204"/>
                            <Product images="https://source.unsplash.com/random/200x205"/>
                            <Product images="https://source.unsplash.com/random/200x206"/>


                        </section>


                        
                <div className={ styles.bestSellersName}> New arrivals </div>
                <section className={styles.products}>
                  
                <Product images="https://source.unsplash.com/random/200x201"/>
                            <Product images="https://source.unsplash.com/random/211x242"/>
                            <Product images="https://source.unsplash.com/random/220x203"/>
                            <Product images="https://source.unsplash.com/random/230x204"/>
                            <Product images="https://source.unsplash.com/random/240x205"/>
                            <Product images="https://source.unsplash.com/random/250x206"/>
                    

                </section>
                <div className={ styles.bestSellersName}> Discounts </div>
                <section className={styles.products}>
                <Product images="https://source.unsplash.com/random/222x201"/>
                            <Product images="https://source.unsplash.com/random/213x202"/>
                            <Product images="https://source.unsplash.com/random/202x203"/>
                            <Product images="https://source.unsplash.com/random/203x204"/>
                            <Product images="https://source.unsplash.com/random/204x205"/>
                            <Product images="https://source.unsplash.com/random/205x206"/>

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

                            <img src="https://images.pexels.com/photos/794064/pexels-photo-794064.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" alt="" />
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
                        <Footer />
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
