import React, {useState} from 'react';
import HistoryItem from './HistoryItem'
import styles from '../CSS/Header.module.css';
import classNames from 'classnames';
import InputStyles from '../CSS/InputFields.module.css';
import ButtonStyles from '../CSS/Buttons.module.css';
import SearchLogo from '../icons/icons8_search_50px.png';

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
            <div>
                <div className={InputStyles.SearchContainer}>
                    <input type="search" placeholder="Filter your products" className={InputStyles.Search} onChange={SearchHandler} value={filter} />
                </div>
            </div>
           { props.historyItems.filter(archivedItem => 
                        (archivedItem.name.toLowerCase().includes(filter.toLowerCase()))).map(item => {
                        return(
                            <HistoryItem {...item} />
                        )})
            } 
        </>
    )
}
