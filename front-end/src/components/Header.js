import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import styles from '../CSS/Header.module.css';
import ButtonStyles from '../CSS/Buttons.module.css';
import classNames from 'classnames';
import SearchLogo from '../icons/icons8_search_filled_50px.png';
import ArrowDown from '../icons/icons8_expand_arrow_filled_50px.png';
import ArrowUp from '../icons/icons8_collapse_arrow_filled_50px.png';
import BasketLogo from '../icons/icons8_shopping_cart_filled_50px.png';
//  icons8_shopping_cart_filled_50px
// import Navbar from './Navbar';
// import menuLogo from '../icons/icons8-menu-50.png';
// import ResetLogo from '../icons/icons8_close_window_filled_50px.png';

// It was initially a functional component but then, 
// I realized that the code will be less coupled and easier to understand if it was a class component.

const loggedIn = 0;

const SearchBar = (props) => {
    return (
        <form className={styles.SearchBox} onSubmit={props.searchSubmitHandler}>
            <input type="search" className={styles.SearchBar} name="q"
                onChange={props.searchInputChangeHandler}
                value={props.searchInput}
            />
            <button type="submit" className={ButtonStyles.IconButtons}> <img src={SearchLogo} alt="decorative" className={classNames(styles.SearchLogo, styles.Icons)} /> </button>
        </form>
    )
}


export default class Header extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            DropDownMenuButton: styles.ArrowDownCollapsed,
            DropDownMenu: styles.DropDownMenuCollapsed,
            ArrowState: ArrowDown,
            NavbarClass: styles.mainNav,
            // NavbarOpen: false,
            // backgroundColor: "rgba(0, 0, 0, 0)"
            searchInput: ""
        }
    }

    // we should not use that because it violates React principle
    scroll = window.onscroll = function () {
        var scrolled = window.pageYOffset || document.documentElement.scrollTop; // Получаем положение скролла
        if (scrolled !== 0) {

            // If the scrollbar is scrolled it makes the background transparent
            // document.querySelector('#navbar').styles.mainNav.opacity = '0.5';
            // console.log(scrolled)
        } else {
            // Если нет, то делаем его полностью видимым
            // else it makes the background visible
            // document.querySelector('#navbar').styles.mainNav.opacity = '1';
        };
    };

    DropDownClickHandler = event => {
        this.setState({ DropDownMenuButton: this.state.DropDownMenuButton === styles.ArrowDownCollapsed ? styles.ArrowDownExpanded : styles.ArrowDownCollapsed });
        this.setState({ DropDownMenu: this.state.DropDownMenu === styles.DropDownMenuCollapsed ? styles.DropDownMenuExpanded : styles.DropDownMenuCollapsed });
        this.setState({ ArrowState: this.state.ArrowState === ArrowUp ? ArrowDown : ArrowUp });
        this.setState({ NavbarClass: this.state.NavbarClass === styles.mainNav ? styles.mainNavExpanded : styles.mainNav });


        console.log(this.state.NavbarClass);
        // console.log(this.state.DropDownMenuButton);
        // console.log(this.state.ArrowState);
    }

    searchInputChangeHandler = (event) => {
        event.preventDefault();
        this.setState({ searchInput: event.target.value })
    }

    searchSubmitHandler = (event) => {
        event.preventDefault();
        //let history =  useHistory();
        console.log("submited");
        this.props.history.push('/search?q='+encodeURIComponent(this.state.searchInput));
    }
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

        // console.log(this.props.style)
        // console.log(this.props.user);

        // The line of code below is the commented logo picture

        // <img className={styles.logo} src="https://www.moodysfoodtrucks.com/wp-content/uploads/2012/12/logo-copy.png" alt="logo" />
            return (
                <nav className={this.state.NavbarClass}>
                    <div className={styles.LogoDiv}>
                        <Link to="/"> mothersell </Link>
                    </div>
                    <div className={this.state.DropDownMenu}>
                        <SearchBar
                            searchSubmitHandler={this.searchSubmitHandler}
                            searchInputChangeHandler={this.searchInputChangeHandler}
                            searchInput={this.state.searchInput}
                        ></SearchBar>
                        <div className={styles.LoginRegisterButtons}>
                            { this.props.user.username ? (
                                    <>
                                        <button id={styles.Login} className={ButtonStyles.PrimaryButton}> <Link to="/basket" > <img src={BasketLogo} className={styles.Icons} /> </Link></button> 
                                        <button id={styles.Register} className={ButtonStyles.PrimaryButton}> <Link to="/profile" > Profile </Link></button> 
                                    </>
                                ) : (
                                    <>
                                        <button id={styles.Login} className={ButtonStyles.PrimaryButton}> <Link to="/login" > Login </Link></button>
                                        <button id={styles.Register} className={ButtonStyles.PrimaryButton}> <Link to="/register" > Register </Link></button>
                                    </>
                                )
                            }
                        </div>
                    </div>
                    <span className={this.state.DropDownMenuButton} onClick={this.DropDownClickHandler} > <img alt="decorative" src={this.state.ArrowState} className={styles.Icons} /> </span>
                </nav>
            )
        }
}
