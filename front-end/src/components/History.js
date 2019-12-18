import React, {useState} from 'react';
import HistoryItem from './HistoryItem'
import styles from '../CSS/OnSellProducts.module.css';
import InputStyles from '../CSS/InputFields.module.css';

export default function History(props) {

    console.log(props);

    const [filter, setFilter] = useState("")

    const SearchHandler = (event) => {
        console.log(event);
        setFilter(event.target.value);
        console.log(filter);
        // console.log(props.historyItems[0]);
        // console.log(props.historyItems[0].name);
    }

    return (
        <>
            <div className={styles.OnSellHeader}>
                <div className={styles.FilterField}>
                    <div className={InputStyles.SearchContainer}>
                        <input type="search" placeholder="Filter products" className={InputStyles.Search} onChange={SearchHandler} value={filter} />
                    </div>
                </div>
            </div>
            {
            !props.historyItems.length ? (
                <div class="container">
                    <div class="text-center">
                        <h3>No search results</h3>
                        <h4> You found only this beautiful cat</h4>
                        <img src="https://www.pinclipart.com/picdir/big/57-576568_pusheen-cat-clipart.png" class="img img-fluid col-md-6" alt="decoration"></img>
                        <h6>P.S it's priceless</h6>
                    </div>                
                </div>
            ) : (
                props.historyItems.filter(archivedItem => 
                    (archivedItem.name.toLowerCase().includes(filter.toLowerCase()))).map(item => {
                        return(
                            <HistoryItem {...item} />
                        )})
            )
            } 
        </>
    )
}
