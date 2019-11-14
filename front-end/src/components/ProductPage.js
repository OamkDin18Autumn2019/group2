import React, { Component } from 'react'

export default class ProductPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            amount: 1,
            data: {
                name: 'Name of the product with everything in it. It might be very long',
                rating: 4,
                price: 300,
                description: 'Detailed description of the product will all the needed information displayed on this page. The data like: the materials it was made of, the functionalities of the product and the setcharacteristics from the manufacturer.',
                photo: 'https://azpet.com.vn/wp-content/uploads/2019/06/cho-alaska-malamute.jpg'
            }
        }
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
        return (
            <div className="container">
                <div className="row">
                    <div className="col-3">
                        <div className="h-100 border border-secondary">
                            <img className="h-100 w-100 no-gutters m-0" src={this.state.data.photo}></img>
                        </div>
                    </div>
                    <div className="col border border-secondary">
                        <div>{this.state.data.name}</div>
                        <div>Rating: {this.state.data.rating}</div>
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
}

