import React, { useState } from 'react';
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
                            <h3>Nothing here yet</h3>
                            <img src="https://avatars.mds.yandex.net/get-pdb/1658707/a43a9608-3ce0-4943-a25e-fc8ad7302cd3/s1200" class="img img-fluid col-md-6" alt="decoration"></img>
                            <h6>Just this sleepy beauty</h6>
                        </div>
                    </div>
                ) : (
                        props.historyItems.filter(archivedItem =>
                            (archivedItem.name.toLowerCase().includes(filter.toLowerCase()))).map(item => {
                                return (
                                    <HistoryItem {...item} />
                                )
                            })
                    )
            }
        </>
    )
}
