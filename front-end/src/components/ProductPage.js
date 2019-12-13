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
        let temporary_amount = this.state.amount;
        temporary_amount++;
        this.setState({ amount: temporary_amount })
    }
    decreaseAmount = () => {
        let temporary_amount = this.state.amount;
        if (temporary_amount > 1) {
            temporary_amount--;
        }
        this.setState({ amount: temporary_amount })
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
        //   this.props.addToCartGlobal
        this.props.addToCartGlobal({ ...this.state.data }, this.state.amount)
        // console.log(this.props );

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
                                    <div class="col-md-8 col-s-12 col-lg-7 pl-4"><div class=""> <h1 class="">{this.state.data.name}</h1></div>
                                        <div class="row"> {this.state.data.description}</div>
                                        <div class="row py-2"><div class='my-auto'>Price:</div> <div class=""className={ styles.price }>€{this.state.data.price}</div> </div>
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
                                            <button class="btn btn-danger btn-sm" onClick={this.decreaseAmount}>-</button>
                                            <span className="p-2">{this.state.amount}</span>
                                            <button class="btn btn-info btn-sm"onClick={this.increaseAmount}>+</button>
                                        </div>
                                        <div>
                                            {this.checkCart}
                                            {/* <button className="btn btn-primary mr-2">Buy now</button> */}
                                            <button className="mr-2 btn btn-success btn-lg" onClick={this.addToCart}>Put into cart</button>
                                            <button class ="btn btn-primary btn-lg" onClick={() => this.props.history.goBack()}>Go back</button>

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
                    <div className="container">
                        <div className="row">
                            <div className="col-3">
                                <div className="h-100 border border-secondary">
                                    <img className="h-100 w-100 no-gutters m-0" src="https://i2.wp.com/stevecorn.com/wp-content/uploads/2019/04/empty.jpg?fit=786%2C410&ssl=1" />
                                </div>
                            </div>
                            <div className="col border border-secondary p-4">
                                <div>Nothing's here.</div>
                                <div>You see this message because there's no such product.</div>
                            </div>
                        </div>
                    </div>
                </>
            )
        }

    }
}

