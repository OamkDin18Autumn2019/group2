
import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../CSS/LandingPage.module.css';
import axios from 'axios';
import StarRatings from 'react-star-ratings';

export default class Product extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showProduct: styles.hide,
            rating: null,
            user: {...this.props.user}
        }
    }

    changeRating = (newRating, name) => {
        if (this.props.user.username !== "") {
            if (this.state.rating == null) {
                axios.put(`http://localhost:4000/v1/product/changeRating/${this.props.id}`, {
                    // headers: {
                    //     'x-access-token': this.props.user.token
                    // },
                    "ratingProduct": newRating

                })
                    .then(res => {
                        console.log(res)
                        this.setState({
                            rating: newRating
                        })
                    })
                    .catch((err) => console.log(err))
            } else {
                console.log('You have already rated the product')
            }

        } else {
            console.log('You are not logged in')
            // this.props.history.push('/login');
        }
    }
    showMore = () => {
        console.log(this.props.showProduct)
        if (this.state.showProduct === styles.hide) {
            this.setState({
                showProduct: styles.showMoreInfo
            })
        } else {
            this.setState({
                showProduct: styles.hide
            })
        }

    }

    render() {

        return (
            <>
                <div className={styles.img_block}>
                    <div className={styles.content_block}><img alt="product" src={`http://localhost:4000/${this.props.images}`} />
                        <div className={styles.over_block}>
                        </div>
                        {/* {this.props.ratingProduct} */}
                    
                        <span>    
                            {
                                (this.props.discount === 0 ) ? 
                                <Link to={`/product/${this.props.id}`}>{this.props.price}$      </Link>
                                :
                                <Link to={`/product/${this.props.id}`}>
                                    <div className={styles.column}>
                                    {this.props.price - this.props.price * this.props.discount/100}$  
                                    <strike className={styles.previousPrice}><i>{this.props.price}$</i></strike> 
                                        </div> </Link>



                            }
                            <div className={styles.stars}>
                              
                                    <StarRatings
                                    starDimension='35px'
                                    rating={(this.state.rating == null) ? this.props.ratingProduct : this.state.rating}
                                    starHoverColor='yellow'
                                    starRatedColor='yellow'
                                    starEmptyColor='white'
                                    changeRating={this.state.user.username !== "" ? (this.changeRating): ""}
                                    numberOfStars={5}
                                    starSpacing='1px'
                                /> 
                                <div className={styles.notification}>
                                {
                                    (this.props.ratingProduct === 0 && this.state.rating === null) ? 'No rates yet' : "" 
                                }
                                { console.log(this.state.user.username)}
                                {/* { (this.props.user.username) ? console.log(this.props.user) : console.log('Yes')}     */}
                                </div>
                            </div>
                        </span>
                    </div>
                </div>
            </>
        )
    }
}
