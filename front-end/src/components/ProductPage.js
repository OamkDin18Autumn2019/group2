import React, { Component } from 'react';
import axios from 'axios';
import styles from "../CSS/ProductPage.module.css";
import StarRatings from 'react-star-ratings';
import { Link } from 'react-router-dom';



export default class ProductPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productAvailability: false,
            amount: 1,
            data: null
        }
    }
    componentDidMount() {
        let idProduct = parseInt(this.props.match.params.id);
        console.log(this.props.user.token)
        axios.get(`http://localhost:4000/v1/product/${idProduct}`, {
            headers: {
                'x-access-token': this.props.user.token
            }
        })
            .then(res => {
                console.log(this.props.user);
                console.log(res.data);
                //The following line is to check the response JSON due to the weird structure of the response
                console.log(res.data.rows[0]);
                if (res.data.rows[0] !== undefined) {
                    this.setState({ productAvailability: true, data: res.data.rows[0] });
                }
            })
            .catch(err => {
                console.log(err);
                return null;
            })
    }
    increaseAmount = () => {
        if (this.state.amount < this.state.data.amountOfProduct) {
            let temporary_amount = this.state.amount;
            temporary_amount++;
            this.setState({ amount: temporary_amount })
        }

    }
    decreaseAmount = () => {
        if (this.state.amount !== 1) {
            let temporary_amount = this.state.amount;
            if (temporary_amount > 1) {
                temporary_amount--;
            }
            this.setState({ amount: temporary_amount })
        }

    }
    checkCart = () => {
        this.props.cart.forEach(item => {
            if (this.state.data.id === item.id) {
                return true
            }
        });
    }
    addToCart = (event) => {
        event.preventDefault();
        this.props.addToCartGlobal({ ...this.state.data }, this.state.amount)

    }
    render() {

        //Conditional renderer for available product
        if (this.state.productAvailability === true) {
            return (
                <div className={styles.background} >
                    <div className={styles.main}>
                        <div className="container py-5">
                            <div className={styles.mainCon}>
                                <div className="d-flex align-content-start flex-wrap p-4">
                                    <div class="col-md-4 col-s-12 col-lg-5"><img class="img img-fluid" className={styles.productImg} alt="product image" src={this.state.data.images}></img></div>
                                    <div class="col-md-8 col-s-12 col-lg-7 pl-5"><div class=""> <h1 class="">{this.state.data.name}</h1></div>
                                        <div class="row"> {this.state.data.description}</div>
                                        <div class="row py-2"><div class='my-auto'>Price:</div>
                                            <div className={styles.price}>€{this.state.data.price - this.state.data.price * this.state.data.discount / 100} (-{this.state.data.discount}%)</div>
                                        </div>
                                        <div class="row"><StarRatings
                                            starDimension='30px'
                                            rating={this.state.data.ratingProduct}
                                            starHoverColor='yellow'
                                            starRatedColor='yellow'
                                            // starEmptyColor='red'
                                            // changeRating={this.changeRating}
                                            numberOfStars={5}
                                            starSpacing='1px'
                                        /> </div>
                                        {(this.props.user.username !== "") ?
                                            <Link to={`/profile/${this.state.data.idUser}`}><div class="row">by {this.state.data.username}</div>   </Link>
                                            :
                                            <Link to={`/login`}><div class="row">by {this.state.data.username}</div> </Link>
                                        }
                                        <div className="py-4">
                                            <span className="pr-2">Amount:</span>
                                            <button class="btn btn-secondary btn-sm" onClick={this.decreaseAmount}>-</button>
                                            <span className="p-2">{this.state.amount}</span>
                                            <button class="btn btn-info btn-sm" onClick={this.increaseAmount}>+</button>
                                        </div>
                                        <div>
                                            {this.checkCart}
                                            {/* <button className="btn btn-primary mr-2">Buy now</button> */}
                                            <button className="mr-2 btn btn-info mt-1 btn-lg" onClick={this.addToCart}>Put into cart</button>
                                            <button class="btn btn-info mt-1 btn-lg" onClick={() => this.props.history.goBack()}>Go back</button>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
        else {
            return (
                <>
                    <div className={styles.backgroundNo}>
                        <div className={styles.mainNo}>
                            <div class="container">
                                <div className={styles.mainCon}>
                                    <div class="row p-2">
                                        <h2 class="text-justify mx-auto"> There is no product with such an ID</h2>
                                        <div class="col-12">
                                            <img alt="cat" class="img-fluid mx-auto d-block" src="https://telegram.org.ru/uploads/posts/2017-03/1490200280_28.png"></img>
                                            <button class="btn mt-2 btn-md btn-block btn-info" onClick={() => this.props.history.goBack()}>Continue Shopping</button>
                                        </div>
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

