import React from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';
import styles from '../CSS/OnSellProduct.module.css';
import ButtonStyles from '../CSS/Buttons.module.css';
import StarRatings from 'react-star-ratings';

export default function OnSellProduct(props) {

    console.log(props);

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
            <div className={styles.ImageAndDescription}>
                <img src={`http://localhost:4000/${props.images}`} class="img img-fluid" alt="Padoru Padoru!" />
                <div className={styles.Description}>
                    <p style={{"font-size": "1.4em"}}>Description</p>
                    <p>
                        {props.description}
                    </p>
                </div>
            </div>
            <div className={styles.ProductInfo}>
                <div className={styles.Name}>
                    <h3> {props.name} </h3> 
                    {/* Nursultan it is a discount system, it touches only the calculations for 
                        products with discount
                    */}
                    {
                        (props.discount === 0) ? 
                    <p> {props.price} €</p>
                    :
                    <p> {props.price - props.price * props.discount / 100} € (-{props.discount}%)</p>
                    }
                </div>
                <div className={styles.Rating}>
                    <StarRatings
                        starDimension='35px'
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
            {
            !props.urlId ? (
                <div className={styles.Buttons}>
                    <Link to={`/editProduct/${props.id}`}> <button className={ButtonStyles.EditButton}> Edit  </button> </Link>
                    <button onClick={deleteProduct} className={ButtonStyles.DeleteButton}>Delete</button>
                </div>
            ) : (
                <>
                </>
            )
            }
        </div>
        <hr style={{"width": "100%"}}></hr>
        </>
    )
}