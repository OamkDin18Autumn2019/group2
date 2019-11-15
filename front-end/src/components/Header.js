import React from 'react';
// import Navbar from './Navbar';
import { Link }  from 'react-router-dom';
import styles from '../CSS/Header.module.css';
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
         
        }
      }

       scroll = window.onscroll = function() {
        var scrolled = window.pageYOffset || document.documentElement.scrollTop; // Получаем положение скролла
        if(scrolled !== 0){
          // Если прокрутка есть, то делаем блок прозрачным
        //   document.querySelector('#navbar').styles.mainNav.opacity = '0.5';
        console.log(scrolled)
        }else{
          // Если нет, то делаем его полностью видимым
        //   document.querySelector('#navbar').styles.mainNav.opacity = '1';
        };
      };
     
    render() {
        if (loggedIn) {
            return(
                
                   <nav id="navbar" className={styles.mainNav}>
                    <ul>
                        <li > <a href="#" className={styles.logo}>Logo</a></li>
                        <div></div>
                        <div></div>

                        <li> <a type="button" href="#">Search</a></li>
                        <li> <a href="#">Register</a></li>

                    </ul>
                    </nav>
              
            )
        }
     else {
        return(            
                <nav className={styles.mainNav}>
                    <ul>
                    <li> <a href="#"> <img className={styles.logo}src="https://www.moodysfoodtrucks.com/wp-content/uploads/2012/12/logo-copy.png" alt="logo"></img></a></li>

                    <li> </li>
                    <li> </li>

                        <Link to="/login" >  <div className={styles.loginBtn}>Login</div> </Link> 
                        <Link to="/register" >  <div className={styles.loginBtn}>Register</div> </Link> 
                    </ul>
                </nav>
        )
    }
}
}
