import React from 'react';
import styles from '../CSS/OnSellProduct.module.css';

export default function OnSellProduct(props) {

    console.log(props);

    return(
        <div className={styles.OnSellProduct}>
            <img src={props.images} className={styles.Image} alt="Padoru Padoru!" />
            <div className={styles.ProductInfo}>
                <div className={styles.Name}>
                    <h3> {props.name} </h3> 
                    <p> {props.price} </p>
                </div>
                <div className={styles.Rating}>
                    <p> {props.ratingProduct} </p>
                    <p> {props.amountOfRates} </p>
                </div>
                <div className={styles.amountOfProduct}>
                    <p> {props.amountOfProduct} </p>
                    <p> {props.amountOfSoldProduct} </p>
                </div>
            </div>
        </div>
    )
}