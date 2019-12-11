import React, { useState } from 'react';
import OnSellProduct from './OnSellProduct';
import Loader from 'react-loader-spinner';
import classNames from 'classnames';
import styles from '../CSS/Header.module.css';
import InputStyles from '../CSS/InputFields.module.css';
import ButtonStyles from '../CSS/Buttons.module.css';
import LoaderStyle from '../CSS/Loader.module.css';

export default function OnSellProducts(props) {

    console.log(props.currentSaleItems);
    // console.log(props.currentSaleItems.filter(onSell => (onSell.name. includes("YES"))));
    // console.log(props.currentSaleItems.filter(onSell => (onSell.name.includes("N"))));
    // console.log(props.currentSaleItems.map(product => product.name));
    // console.log(props.currentSaleItems.filter(onSell => (onSell.name.includes(""))).map(item => {
    //     return(
    //         <OnSellProduct props={item} />
    //     )}));

    

    const [filter, setFilter] = useState("");

    const SearchHandler = (event) => {
        console.log(event);
        setFilter(event.target.value);
        console.log(filter);
        console.log(props.currentSaleItems[0]);
        console.log(props.currentSaleItems[0].name);
    }

    return (
        <>
            <div className={InputStyles.FilterField}>
                <div className={InputStyles.SearchContainer}>
                    <input type="search" placeholder="Filter your products" className={InputStyles.Search} onChange={SearchHandler} value={filter} />
                </div>
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
                    props.currentSaleItems.filter(onSell => 
                        (onSell.name.toLowerCase().includes(filter.toLowerCase()))).map(item => {
                        return(
                            <OnSellProduct {...item} />
                        )})
                )
            }
        </>
    )
}
