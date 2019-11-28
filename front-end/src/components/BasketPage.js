import React, { Component } from "react";
import styles from "../CSS/Basket.module.css";
import Header from "./Header"
import BasketProductEntry from "./BasketProductEntry";

export default class BasketPage extends Component {
  tempProducts = [
    {
      name: "Product A",
      price: 1.5,
      quantity: 1,
      image: "url",
      id: "id",
      description: "Product A description"
    },
    {
      name: "Product B",
      price: 2,
      quantity: 2,
      image: "url",
      id: "id",
      description: "Product B description"
    },
    {
      name: "Product C",
      price: 2.5,
      quantity: 3,
      image: "url",
      id: "id",
      description: "Product C description"
    }
  ];

  productEntries = this.tempProducts.map(entry => (
    <BasketProductEntry data={entry} />
  ));
  render() {
    return (
      <>
        <Header user={this.props.user} />
        <div className={styles.main}>
          <div className={styles.titleBar}>
            <button className={styles.paymentButton}>Continue to payment </button>
          </div>
          <div className={styles.items}>{this.productEntries}</div>
        </div>
      </>
    );
  }
}
