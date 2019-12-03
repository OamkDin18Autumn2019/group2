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
  console.log(this.props.cart)
  for (let i = 0; i < this.props.cart.length; i++) {
    axios.put(`http://localhost:4000/v1/product/${this.props.cart[i].id}`,
    {
      amountOfProduct: this.props.cart[i].amountOfProduct - this.props.cart[i].amountInTheCart,
      amountOfSoldProduct: this.props.cart[i].amountOfSoldProduct + this.props.cart[i].amountInTheCart,
    },
    {
      headers: {
        Authorization: this.props.user.token
      }
    })
    .then(res => {
      // this.props.deleteFromCartById(i);
      // da.push(i);
      console.log(res)
    })
    .catch( err => console.log(err))


    
  }
 

  }
  render() {
    return (

      <>
        <div className={styles.main}>
          <div className={styles.titleBar}>
            <button onClick={this.buyProducts} className={styles.paymentButton}>Buy</button>
            <button onClick={() => this.props.history.goBack()}>Go back</button>
          </div>
          <div className={styles.items}>{this.props.cart.map((entry, i) => (
    <BasketProductEntry key={i} data={entry} />
  ))}</div>
        </div>
      </>
    );
  }
}
