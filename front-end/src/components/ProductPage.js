import React, { Component } from 'react';
import axios from 'axios';

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
        axios.get(`http://localhost:3000/v1/product/${idProduct}`)
            .then(res => {
                console.log(res);
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
    render() {
        //Conditional renderer for available product
        if (this.state.productAvailability === true) {
            return (
                <div className="container">
                    <div className="row">
                        <div className="col-3">
                            <div className="h-100 border border-secondary">
                                <img className="h-100 w-100 no-gutters m-0" src={this.state.data.images}></img>
                            </div>
                        </div>
                        <div className="col border border-secondary p-4">
                            <div>{this.state.data.name}</div>
                            <div>Rating: {this.state.data.ratingProduct}</div>
                            <div>Price: {this.state.data.price}</div>
                            <div>Description: {this.state.data.description}</div>
                            <div className="py-2">
                                <span className="pr-2">Amount:</span>
                                <button onClick={this.decreaseAmount}>-</button>
                                <span className="p-2">{this.state.amount}</span>
                                <button onClick={this.increaseAmount}>+</button>
                            </div>
                            <div>
                                <button className="mr-2">Buy now</button>
                                <button>Put into cart</button>
                            </div>
                        </div>
                    </div>

                </div>
            )
        }
        else {
            return (
                <div className="container">
                    <div className="row">
                        <div className="col-3">
                            <div className="h-100 border border-secondary">
                                <img className="h-100 w-100 no-gutters m-0" src="https://i2.wp.com/stevecorn.com/wp-content/uploads/2019/04/empty.jpg?fit=786%2C410&ssl=1"></img>
                            </div>
                        </div>
                        <div className="col border border-secondary p-4">
                            <div>Nothing's here.</div>
                            <div>You see this message because there's no such product.</div>
                        </div>
                    </div>

                </div>
            )
        }

    }
}

