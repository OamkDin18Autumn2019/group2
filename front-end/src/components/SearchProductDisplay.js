import React from 'react';
//import styles from '../CSS/SearchPage.module.css';
import StarRatings from 'react-star-ratings';
import { Link } from 'react-router-dom';

export default function VerticalProductDisplay(props) {
    return (
        <>
            <div class="container">
                <div className="d-flex flex-wrap">
                    <div class="col-md-4 col-s-12 col-lg-2"><img class="img img-fluid" alt="product" src={`http://localhost:4000/${props.images}`}></img></div>
                    <div class="col-md-6 col-s-10 col-lg-8 pl-4"><div class="row">  <Link to={`/product/${props.id}`}><h3 class="">{props.name}</h3></Link></div>
                        <div class="row"> {props.description}</div>
                        <div class="row">
                            <StarRatings
                                starDimension='30px'
                                rating={props.ratingProduct}
                                starHoverColor='yellow'
                                starRatedColor='yellow'
                                // starEmptyColor='red'
                                // changeRating={this.changeRating}
                                numberOfStars={5}
                                starSpacing='1px'
                            /> </div>
                    </div>
                    <div class="col-2">
                        <h1>€{props.price}</h1>
                    </div>
                </div>
            </div>
            <hr />
        </>
    )
}
