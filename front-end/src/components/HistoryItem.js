import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../CSS/History.module.css';
// import ButtonStyles from '../CSS/Buttons.module.css';
import StarRatings from 'react-star-ratings';

export default function HistoryItem(props) {
    return (
    <div className={styles.OnSellProduct}>
        <img src={props.images} className={styles.Image} alt="Padoru Padoru!" />
        <div className={styles.ProductInfo}>
            <div className={styles.Name}>
                <label>Name</label>
                <h3> {props.name} </h3> 
                <p> {props.price} €</p>
            </div>
            <div className={styles.Rating}>
                <label>Rating</label>
                <StarRatings
                    starDimension='35px'
                    rating={props.rating}
                    starHoverColor='#6CCF6D'
                    starRatedColor='#19B51B'
                    starEmptyColor='black'
                    numberOfStars={5}
                    starSpacing='1px'
                /> 
            </div>
            <div>
                <label></label>
                <p> {props.amountOfRates} </p>
            </div>
            <div className={styles.amountOfProduct}>
                <p> {props.amountOfProduct} </p> <p> {props.amountOfSoldProduct} </p>
            </div>
        </div>
    </div>
    )
}
