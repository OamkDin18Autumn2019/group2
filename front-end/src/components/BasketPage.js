import React, { Component } from "react";
import styles from "../CSS/Basket.module.css";
import BasketProductEntry from "./BasketProductEntry";
import axios from 'axios';
import { Link } from 'react-router-dom';


export default class BasketPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isProceeded : false,
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
             await this.setState({
                isProceeded : true
              })
              await arrayToDelete.push(this.props.cart[i]);
              setTimeout(() => this.props.history.goBack(), 3000);
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
    if (this.props.cart.length !== 0) {
      return (
        <>
          <div className={styles.background}>
            <div className={styles.main}>
              <div class="container mb-4 mt-5">
                <div className={styles.mainCon}>
                  <div class="row">
                    <h2 class="text-justify  pl-4"> Products is the cart</h2>
                    <div class="col-12">
                      <div class="table table-responsive ">
                        <table class="table table-striped table-bordered ">
                          <thead>
                            <tr>
                              <th scope="col">Image</th>
                              <th scope="col">Product</th>
                              <th scope="col">Available</th>
                              <th scope="col" class="text-center">Quantity</th>
                              <th scope="col" class="text-right">Price</th>
                              <th> Delete from the cart</th>
                            </tr>
                          </thead>
                          <tbody>
                            {this.props.cart.map((entry, i) => (
                              <BasketProductEntry deleteFromCartById={this.props.deleteFromCartById} key={i} data={entry} />
                            ))}
                            <tr>
                              <td></td>
                              <td></td>
                              <td></td>
                              <td></td>
                              <td>Sub-Total</td>
                              <td class="text-right">{this.props.cart.reduce(function (sum, current) {
                                return sum + current.price * current.amountInTheCart;
                              }, 0)}€</td>
                            </tr>
                            <tr>
                              <td></td>
                              <td></td>
                              <td></td>
                              <td></td>
                              <td>Shipping</td>
                              <td class="text-right">0 €</td>
                            </tr>
                            <tr>
                              <td></td>
                              <td></td>
                              <td></td>
                              <td></td>
                              <td><strong>Total</strong></td>
                              <td class="text-right"><strong>{this.props.cart.reduce(function (sum, current) {
                                return sum + current.price * current.amountInTheCart;
                              }, 0)} €</strong></td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div class="col mb-2">
                      <div class="row">
                        <div class="col-sm-12  col-md-6">
                          <button class="btn btn-lg btn-block btn-info" onClick={() => this.props.history.goBack()}>Continue Shopping</button>
                        </div>
                        <div class="col-sm-12 col-md-6 text-right">
                          <button class="btn btn-lg mt-1 btn-block btn-success text-uppercase" onClick={this.buyProducts}>Buy</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      );
    } else if (this.state.isProceeded  === false) {
      return (
        <>
          <div className={styles.background}>
            <div className={styles.main}>
              <div class="container mb-4 mt-5">
                <div className={styles.mainCon}>
                  <div class="row">
                    <h2 class="text-justify mx-auto  pl-4"> You have nothing in your cart</h2>
                    <div class="col-12">
                      <img alt="cat" class="img-fluid col-md-5 col-sm-10 mx-auto d-block" src="https://cdn.telegram-site.com/images/stickers/9/6/0/11.jpg"></img>
                      <button class="btn mt-2 btn-md btn-block btn-info" onClick={() => this.props.history.goBack()}>Continue Shopping</button>
                    </div>
                    <div class="col mb-2">
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </>
      )
    } else  {
      return(
        <>
          <div className={styles.background}>
            <div className={styles.main}>
              <div class="container mb-4 mt-5">
                <div className={styles.mainCon}>
                  <div class="row">
                    <h2 class="text-justify mx-auto  pl-4"> Done successfully</h2>
                    <div class="col-12">
                      <img alt="cat" class="img-fluid mx-auto d-block my-2 col-md-3 col-sm-10" src="https://www.datakrat.ru/upload/medialibrary/e6d/Безымянный-22.png"></img>
                    </div>
                    <h4 class="text-justify mx-auto pl-4"> Check your <Link to={`/profile`}>profile</Link>  </h4>
             
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )
    }
  }
      
}
