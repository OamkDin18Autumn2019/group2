import React from 'react';
import HistoryItem from './HistoryItem'
import styles from '../CSS/History.module.css';

export default function History(props) {

    console.log(props);

    return (
        <>
            sdasdas
           {props.historyItems.map((item, key) => {
               return(
                   <HistoryItem key={key} {...item} />
               )
           })} 
        </>
    )
}
