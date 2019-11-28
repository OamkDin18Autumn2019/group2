import React, { Component } from "react";
import styles from "../CSS/Basket.module.css";
import Header from "./Header"
import BasketProductEntry from "./BasketProductEntry";
import axios from 'axios';

export default class BasketPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
 
    }
}
  
  buyProducts = () => {
    console.log(this.props.user.token)
    axios.post(`http://localhost:4000/v1/history/`, 
      this.props.cart,
  
       {
         headers: {
           Authorization: this.props.user.token
         }


    })
    .then(result => console.log(result))
    .catch(err => console.log(err))

  }
  productEntries = this.props.cart.map((entry, i) => (
    <BasketProductEntry key={i} data={entry} />
  ));
  render() {
    return (

      <>
        <Header user={this.props.user} />
        <div className={styles.main}>
          <div className={styles.titleBar}>
            <button onClick={this.buyProducts} className={styles.paymentButton}>Buy</button>
            <button onClick={ () => this.props.history.goBack() }>Go back</button>
          </div>
          <div className={styles.items}>{this.productEntries}</div>
        </div>
      </>
    );
  }
}
