import React from 'react';
import styles from '../CSS/OnSellProduct.module.css';
// import ButtonStyles from '../CSS/Buttons.module.css';
import StarRatings from 'react-star-ratings';

export default function HistoryItem(props) {

    console.log(props);

    return (
        <div className={styles.OnSellProduct}>
        <div className={styles.ImageAndDescription}>
            <img src={`http://localhost:4000/${props.images}`} className={styles.Image} alt="Padoru Padoru!" />
            <div className={styles.Description}>
                <p>
                    {props.description}
                </p>
            </div>
        </div>
        <div className={styles.ProductInfo}>
            <div className={styles.Name}>
                <h3> {props.name} </h3> 
                {
                    (props.discount === 0) ? 
                <p> {props.price} €</p>
                :
                <p> {props.price - props.price * props.discount / 100} € (-{props.discount}%)</p>
                }
                <p className={styles.SoldAt}> Sold at {props.created_at.slice(0, 10)} </p>
            </div>
            <div className={styles.Rating}>
                <StarRatings
                    starDimension='30px'
                    rating={props.rating}
                    starHoverColor='#6CCF6D'
                    starRatedColor='#19B51B'
                    starEmptyColor='lightgray'
                    numberOfStars={5}
                    starSpacing='1px'
                /> 
            </div>
            <div className={styles.AmountsOfContainer}>
                <div className={styles.AmountOfRates}>
                    <label># of rates</label>
                    <p> {props.amountOfRates} </p>
                </div>
                <div className={styles.AmountOfProduct}>
                    <label># of remaining products</label>
                    <p> {props.amountOfProduct} </p>
                </div>
                <div className={styles.AmountOfSoldProduct}>
                    <label># of sold products</label>
                    <p> {props.amountOfSoldProduct} </p>
                </div>
            </div>
        </div>
    </div>
    )
}
