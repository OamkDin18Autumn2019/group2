import React from 'react';
// import Navbar from './Navbar';
import { Link }  from 'react-router-dom';
import styles from '../CSS/Header.module.css';
import ButtonStyles from '../CSS/Buttons.module.css';
// import menuLogo from '../icons/icons8-menu-50.png';
import SearchLogo from '../icons/icons8_search_filled_50px.png';
import ResetLogo from '../icons/icons8_close_window_filled_50px.png';

// It was initially a functional component but then, 
// I realized that the code will be less coupled and easier to understand if it was a class component.

const loggedIn = 0;

export default class Header extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            // NavbarOpen: false,
            // backgroundColor: "rgba(0, 0, 0, 0)"
        }
      }

        // we should not use that because it violates React principle
        scroll = window.onscroll = function() {
            var scrolled = window.pageYOffset || document.documentElement.scrollTop; // Получаем положение скролла
            if(scrolled !== 0){
            // If the scrollbar is scrolled it makes the background transparent
            // document.querySelector('#navbar').styles.mainNav.opacity = '0.5';
        console.log(scrolled)
            } else {
            // Если нет, то делаем его полностью видимым
            // else it makes the background visible
            // document.querySelector('#navbar').styles.mainNav.opacity = '1';
            };
        };

    // this function changes the background color of the header component depeneding on the position of the scrollbar on Y axis    
    // listenScrollEvent = e => {
    //     if (window.scrollY > 50) {
    //         this.setState({backgroundColor: 'black'})
    //     } else {
    //         this.setState({backgroundColor: 'rgba(0, 0, 0, 0)'})
    //     }
    // }

    // I copied this function so I do not know what exactly it does. I suppose it "listens" to the scroll of the window
    // componentDidMount() {
    //     window.addEventListener('scroll', this.listenScrollEvent)
    // }

    // It changes the state of the navbar, which slides the navbar in or out
    // NavbarClickHandler = () => {
    //     this.setState((prevsState) => {
    //         console.log("it works");
    //         return {NavbarOpen: !prevsState.NavbarOpen};
    //     });
    // };

    // When you press on the gray background when navbar is open it closes the navbar.
    // BackdropClickHandler = () => {
    //     this.setState({NavbarOpen: false})
    // }
     
    render() {
        if (loggedIn) {
            return(
                   <nav id="navbar" className={styles.mainNav}>
                      <a href="#" className={styles.logo}>Logo</a>
                      <div className={styles.Dropdown}>
                          <input className={styles.SearchBar} /> 
                          <a type="button" href="#">Cart</a>
                          <a href="#">Profile</a>
                      </div>
                </nav>      
            )
        }
     else {
        return(            
                <nav className={styles.mainNav}>
                    <a href="#"> <img className={styles.logo} src="https://www.moodysfoodtrucks.com/wp-content/uploads/2012/12/logo-copy.png" alt="logo"></img></a>
                    <div className={styles.Dropdown}>
                        <input className={styles.SearchBar} /> 
                        <button className={ButtonStyles.PrimaryButton}> <Link to="/login" > Login </Link></button> 
                        <button className={ButtonStyles.PrimaryButton}> <Link to="/register" > Register </Link></button> 
                    </div>
                </nav>
        )
    }
}
}
