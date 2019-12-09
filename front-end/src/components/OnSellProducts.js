import React from 'react'
import OnSellProduct from './OnSellProduct';
import InputStyles from '../CSS/InputFields.module.css';
import ButtonStyles from '../CSS/Buttons.module.css';
import classNames from 'classnames';
import SearchLogo from '../icons/icons8_search_50px.png';
import styles from '../CSS/Header.module.css';

export default function OnSellProducts(props) {

    console.log("test");
    console.log("shit");
    console.log(props.currentSaleItems);

    const SearchHandler = (event) => {
        console.log(event);
    }

    return (
        <>
            <div>
                <form className={InputStyles.SearchContainer}>
                    <input type="search" className={InputStyles.Search} onChange={SearchHandler} />
                    <button type="submit" className={ButtonStyles.IconButtons}> <img src={SearchLogo} alt="decorative" className={classNames(styles.SearchLogo, styles.Icons)} /> </button>
                </form>
            </div>
            {props.currentSaleItems.filter(onSell => (
                onSell => onSell.ProductName.includes("bruh")).map(
                    filteredItem => {
                        return(
                            <OnSellProduct currentSaleItems={filteredItem} />
                        )
                    }
                ))}
        </>
    )
}
