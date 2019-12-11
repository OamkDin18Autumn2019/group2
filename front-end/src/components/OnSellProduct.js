import React from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';
import styles from '../CSS/OnSellProduct.module.css';
import ButtonStyles from '../CSS/Buttons.module.css';
import StarRatings from 'react-star-ratings';

export default function OnSellProduct(props) {

    console.log(props.id);

    const deleteProduct = (e) => {
        e.preventDefault();
        console.log(props.token);
        axios.delete(`http://localhost:4000/v1/product/${props.id}`, {
          headers: {
            'x-access-token': props.token
          }
        })
          .then(res => {
            console.log(res)
            props.DeleteHandler(props.id) 
          })
          .catch(err => {
            console.log(err);
            return null;
          })
    }

    return(
        <>
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
                <div className={styles.Buttons}>
                    <Link to={`/editProduct/${props.id}`}> <button className={ButtonStyles.EditButton}> Edit </button></Link>
                    <button onClick={deleteProduct} className={ButtonStyles.DeleteButton}>Delete</button>
                </div>
            </div>
        </div>
        <hr/>
        </>
    )
}