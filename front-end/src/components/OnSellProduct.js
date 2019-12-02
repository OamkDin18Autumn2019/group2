import React from 'react';
import styles from '../CSS/OnSellProduct.module.css';
import ButtonStyles from '../CSS/Buttons.module.css';

export default function OnSellProduct(props) {

    console.log(props);

    return(
        <>
        <div className={styles.OnSellProduct}>
            <img src={props.images} className={styles.Image} alt="Padoru Padoru!" />
            <div className={styles.ProductInfo}>
                <div className={styles.Name}>
                    <h3> {props.name} </h3> 
                    <p> {props.price} </p>
                </div>
                <div className={styles.Rating}>
                    <p> {props.ratingProduct} some bullshit </p>
                    <p> {props.amountOfRates} some bullshit </p>
                </div>
                <div className={styles.amountOfProduct}>
                    <p> {props.amountOfProduct} 50 </p>
                    <p> {props.amountOfSoldProduct} 100 </p>
                </div>
                <div className={styles.Buttons}>
                    <button className={ButtonStyles.EditButton}>Edit</button>
                    <button className={ButtonStyles.DeleteButton}>Delete</button>
                </div>
            </div>
        </div>
        <hr/>
        </>
    )
}