import React from 'react';
import { Link, useLocation } from 'react-router-dom';
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
            nav: styles.nav,
            // NavbarOpen: false,
            searchInput: "",
            display: this.props.location.pathname
        }
    }

    DropDownClickHandler = event => {
        this.setState({ DropDownMenuButton: this.state.DropDownMenuButton === styles.ArrowDownCollapsed ? styles.ArrowDownExpanded : styles.ArrowDownCollapsed });
        this.setState({ DropDownMenu: this.state.DropDownMenu === styles.DropDownMenuCollapsed ? styles.DropDownMenuExpanded : styles.DropDownMenuCollapsed });
        this.setState({ ArrowState: this.state.ArrowState === ArrowUp ? ArrowDown : ArrowUp });
        this.setState({ NavbarClass: this.state.NavbarClass === styles.mainNav ? styles.mainNavExpanded : styles.mainNav });
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
    listenScrollEvent = e => {
        if (window.scrollY > window.innerHeight - window.innerHeight / 4) {
            //  this.setState({ NavbarClass: this.state.NavbarClass === styles.mainNavExpandedScrolled ? styles.mainNavScrolled : styles.mainNavExpandedScrolled });
            this.setState({nav: styles.navScrolled});
        } else {
            this.setState({nav: styles.nav});
        }
        // console.log(this.state.display);
    }

    // I copied this function so I do not know what exactly it does. I suppose it "listens" to the scroll of the window
    componentDidMount() {
        window.addEventListener('scroll', this.listenScrollEvent);

        if (this.props.location.pathname == '/register' || this.props.location.pathname == '/login') {
            this.setState({display: {display: "none" }});
            // console.log("almost done");
        } else {
            this.setState({display: {display: "grid"}});
            // console.log("almost not");
        }

    }

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

        // console.log(this.props.location.pathname);

        // const headerShower = () => {
            
            // console.log(this.state.display);
        // }

            return (
                <nav className={classNames(this.state.NavbarClass, this.state.nav)}>
                    <div className={styles.LogoDiv}>
                        <Link to="/"> 
                            <img src={'/logo-copy.png'} /> </Link>
                    </div>
                    <div className={this.state.DropDownMenu}>
                        <SearchBar
                            searchSubmitHandler={this.searchSubmitHandler}
                            searchInputChangeHandler={this.searchInputChangeHandler}
                            searchInput={this.state.searchInput}
                        />
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
