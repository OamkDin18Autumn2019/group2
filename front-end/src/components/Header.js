import React from 'react';
import styles from '../CSS/Header.module.css';
import menuLogo from '../icons/icons8-menu-50.png';
import SearchLogo from '../icons/icons8_search_filled_50px.png';
import ResetLogo from '../icons/icons8_close_window_filled_50px.png';

// It was initially a functional component but then, 
// I realized that the code will be less coupled and easier to understand if it was a class component.

const loggedIn = 0;

export default class Header extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
         
        }
      }
     
    render() {
        if (loggedIn) {
            return(
                
                   <nav className={styles.mainNav}>
                    <ul>
                        <li> <a href="#">Home</a></li>
                        <li> <a href="#">Contact</a></li>
                        <li> <a href="#">Help</a></li>
                        <li> <a href="#"> Mother</a></li>
                    </ul>
                    </nav>
              
            )
        }
     else {
        return(
            
                <nav className={styles.mainNav}>
                    <ul>
                        <li> <a href="#">Home</a></li>
                        <li> <a href="#">Contact</a></li>
                        <li> <a href="#">Help</a></li>
                        <li> <a href="#"> Mother</a></li>
                    </ul>
                </nav>
            
        )
    }
}
}
