import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import OnSellProduct from './OnSellProduct';
// import classNames from 'classnames';
import styles from '../CSS/OnSellProducts.module.css';
import InputStyles from '../CSS/InputFields.module.css';
import ButtonStyles from '../CSS/Buttons.module.css';
import LoaderStyle from '../CSS/Loader.module.css';

export default function OnSellProducts(props) {

    console.log(props.currentSaleItems);

    console.log(props);

    const [filter, setFilter] = useState("");

    const SearchHandler = (event) => {
        setFilter(event.target.value);
    }

    return (
        <>
            <div className={styles.OnSellHeader}>
                <div className={styles.FilterField}>
                    <div className={InputStyles.SearchContainer}>
                        <input type="search" placeholder="Filter products" className={InputStyles.Search} onChange={SearchHandler} value={filter} />
                    </div>
                </div>
                {
                    !props.urlId ? (
                        <div className={styles.ButtonContainer}>
                            <Link to={`/createProduct`}> <button className={ButtonStyles.CreateButton}> Add a product </button></Link>
                        </div>
                    ) : (
                        <>
                        </>
                    )
                }
            </div>
            {
            !props.currentSaleItems ? (
                <Loader 
                    type="Triangle"
                    color="#000"
                    height={150}
                    width={150}
                    timeout={3000}
                    className={LoaderStyle.Loader}
                />
                ) : (
                    !props.currentSaleItems.length ? (
                        <div class="container">
                            <div class="text-center">
                                <h3>No search results</h3>
                                <h4> You found only this beautiful cat</h4>
                                <img src="https://www.pinclipart.com/picdir/big/57-576568_pusheen-cat-clipart.png" class="img img-fluid col-md-6" alt="decoration"></img>
                                <h6>P.S it's priceless</h6>
                            </div>                
                        </div>
                    ) : (
                        props.currentSaleItems.filter(onSell => 
                            (onSell.name.toLowerCase().includes(filter.toLowerCase()))).map(item => {
                                return(
                                    <OnSellProduct urlId={props.urlId} DeleteHandler={props.DeleteHandler} token={props.token} {...item} />
                                )})
                    )
                )
            }
        </>
    )
}
