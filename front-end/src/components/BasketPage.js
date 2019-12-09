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
        .then(async (res1) => {
          // console.log(res1)
          await axios.post(`http://localhost:4000/v1/user/da/createHistory`,
            {
              ...this.props.cart[i]
            },
            {
              headers: {
                Authorization: this.props.user.token
              }
            })
            .then(async (res) => {
              // console.log(res)
              arrayToDelete.push(this.props.cart[i]);
            })
            .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
    }
    // This function deletes all sold products from the current cart
    // and then changes the global cart
    arrayToDelete.forEach(element => {
      for (let i = 0; i < currentCart.length; i++) {
        if (currentCart[i].id === element.id) {
          // console.log('da')
          currentCart.splice(i, 1);
        }
      }
      this.props.updateCart(currentCart)
    });

  }
  render() {
    return (

      <>
      <div className = {styles.background}>

     
        <div className={styles.main}>
          <div class="container mb-4 mt-5">
            <div className={styles.da}>
              <div class="row">
                <h2 class="text-justify  pl-4"> Products is the cart</h2>
                <div class="col-12">
                  <div class="table-responsive ">
                    <table class="table table-striped table-bordered ">
                      <thead>
                        <tr>
                          <th scope="col"> </th>
                          <th scope="col">Product</th>
                          <th scope="col">Available</th>
                          <th scope="col" class="text-center">Quantity</th>
                          <th scope="col" class="text-right">Price</th>
                          <th> </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td><img src="https://dummyimage.com/50x50/55595c/fff" /> </td>
                          <td>Product Name Dada</td>
                          <td>In stock</td>
                          <td><input class="form-control" type="text" value="1" /></td>
                          <td class="text-right">124,90 €</td>
                          <td class="text-right"><button class="btn btn-sm btn-danger">Delete </button> </td>
                        </tr>
                        <tr>
                          <td><img src="https://dummyimage.com/50x50/55595c/fff" /> </td>
                          <td>Product Name Toto</td>
                          <td>In stock</td>
                          <td><input class="form-control" type="text" value="1" /></td>
                          <td class="text-right">33,90 €</td>
                          <td class="text-right"><button class="btn btn-sm btn-danger">Delete</button> </td>
                        </tr>
                        <tr>
                          <td><img src="https://dummyimage.com/50x50/55595c/fff" /> </td>
                          <td>Product Name Titi</td>
                          <td>In stock</td>
                          <td><input class="form-control" type="text" value="1" /></td>
                          <td class="text-right">70,00 €</td>
                          <td class="text-right"><button class="btn btn-sm btn-danger">Delete </button> </td>
                        </tr>
                        <tr>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td>Sub-Total</td>
                          <td class="text-right">255,90 €</td>
                        </tr>
                        <tr>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td>Shipping</td>
                          <td class="text-right">6,90 €</td>
                        </tr>
                        <tr>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td><strong>Total</strong></td>
                          <td class="text-right"><strong>346,90 €</strong></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div class="col mb-2">
                  <div class="row">
                    <div class="col-sm-12  col-md-6">
                      <button class="btn btn-lg btn-block btn-info">Continue Shopping</button>
                    </div>
                    <div class="col-sm-12 col-md-6 text-right">
                      <button class="btn btn-lg btn-block btn-success text-uppercase">Checkout</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <div className={styles.titleBar}>
            <button onClick={this.buyProducts} className={styles.paymentButton}>Buy</button>
            <button onClick={() => this.props.history.goBack()}>Go back</button>
          </div>
          <div className={styles.items}>{this.props.cart.map((entry, i) => (
            <BasketProductEntry key={i} data={entry} />
          ))}</div> */}
        </div>
        </div>
      </>
    );
  }
}
