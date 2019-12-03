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
    let da = [];
    // let length = this.props.cart.length
   this.props.cart.forEach((element, i) => {
    axios.post(`http://localhost:4000/v1/history/`,
    element,
    {
      headers: {
        Authorization: this.props.user.token
      }
    })
    .then(result => {
      axios.put(`http://localhost:4000/v1/product/${element.id}`,
        {
          amountOfProduct: element.amountOfProduct - element.amountInTheCart,
          amountOfSoldProduct: element.amountOfSoldProduct + element.amountInTheCart,
        },
        {
          headers: {
            Authorization: this.props.user.token
          }
        })
        .then(res => {
          this.props.deleteFromCartById(i);
          da.push(i);
          console.log(da, this.props.cart)
        })
    })
    .catch(err => console.log(err))
   });
   da.forEach(i => {
    this.props.deleteFromCartById(i);
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
