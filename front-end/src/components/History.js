import React, {useState} from 'react';
import HistoryItem from './HistoryItem'
import styles from '../CSS/History.module.css';
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
        console.log(props.historyItems[0]);
        console.log(props.historyItems[0].name);
    }

    return (
        <>
            <div>
                <form className={InputStyles.SearchContainer}>
                    <input type="search" className={InputStyles.Search} onChange={SearchHandler} value={filter} />
                    <button type="submit" className={ButtonStyles.IconButtons}> <img src={SearchLogo} alt="decorative" className={classNames(styles.SearchLogo, styles.Icons)} /> </button>
                </form>
            </div>
           { props.historyItems.filter(archivedItem => 
                        (archivedItem.name.toLowerCase().includes(filter.toLowerCase()))).map(item => {
                        return(
                            <HistoryItem {...item} />
                        )})
            } 
        )
        </>
    )
}
