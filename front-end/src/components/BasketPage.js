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
 
  buyProducts = async () => {
    let arrayToDelete = []
    let currentCart = this.props.cart
// This function goes through all the products in the cart,
// changes the product in the db 
// and creates a history row in the db
  for (let i = 0; i < this.props.cart.length; i++) {
   await axios.put(`http://localhost:4000/v1/product/${this.props.cart[i].id}`,
    {
      amountOfProduct: this.props.cart[i].amountOfProduct - this.props.cart[i].amountInTheCart,
      amountOfSoldProduct: this.props.cart[i].amountOfSoldProduct + this.props.cart[i].amountInTheCart,
    },
    {
      headers: {
        Authorization: this.props.user.token
      }
    })
    .then( async (res1) => {
      console.log(res1)
      await axios.post(`http://localhost:4000/v1/history`,
      {
        ...this.props.cart[i]
      },
      {
        headers: {
          Authorization: this.props.user.token
        }
      })
      .then(async(res) => {
        console.log(res)
        arrayToDelete.push(this.props.cart[i]);
      })
      .catch( err => console.log(err))
    })
    .catch( err => console.log(err))
  }
// This function deletes all sold products from the current cart
// and then changes the global cart
  arrayToDelete.forEach(element => {
    for (let i = 0; i < currentCart.length; i++) {
      if (currentCart[i].id === element.id) {
        // console.log('da')
        currentCart.splice(i,1);
      }
    }
   this.props.updateCart(currentCart)
  });

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
