import React from 'react';
import '../CSS/NavbarDrawer.css';
import styles from '../CSS/Navbar.module.css';
// import categories from '../data/Categories.json';

// I made this using the tutorial I ofund on YouTube. Here is the link: https://www.youtube.com/watch?v=l6nmysZKHFU

export default function Navbar(props) {

    // console.log(categories)
    // console.log(categories.length);
    // console.log("yeah");
    console.log(props);

    let NavBarClass;
    
    if (props.NavbarState === true) {
        NavBarClass = "open";
    } 

    return(
        <>
            <nav className={NavBarClass}>
                <div >
                    <h1>mothersell</h1>
                    <ul>
                        {/* {
                            categories.map((category) =>  <li> {category} </li>)
                        } */}
                        <li> <a> Something </a> </li>
                        <li> <a> Something </a> </li>
                        <li> <a> Something </a> </li>
                        <li> <a> Something </a> </li>
                        <li> <a> Something </a> </li>
                    </ul>
                </div>
            </nav>
            { props.NavbarState === true ? <div className={styles.Backdrop} onClick={props.BackdropClickHandler}/> : console.log("UwU")}
        </>
    )
}
