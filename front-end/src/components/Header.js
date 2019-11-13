import React from 'react';
import Navbar from './Navbar';
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
          NavbarOpen: false,
          backgroundColor: "rgba(0, 0, 0, 0)"
        }
      }
    
      listenScrollEvent = e => {
        if (window.scrollY > 50) {
          this.setState({backgroundColor: 'black'})
        } else {
          this.setState({backgroundColor: 'rgba(0, 0, 0, 0)'})
        }
      }
    
      componentDidMount() {
        window.addEventListener('scroll', this.listenScrollEvent)
      }
    
      NavbarClickHandler = () => {
        this.setState((prevsState) => {
          console.log("it works");
          return {NavbarOpen: !prevsState.NavbarOpen};
        });
      };
    
      BackdropClickHandler = () => {
        this.setState({NavbarOpen: false})
      }

    render() {
        if (loggedIn) {
            return(
                <>
                    {console.log(this.state.NavbarOpen)}
                    <Navbar BackdropClickHandler={this.BackdropClickHandler}
                            NavbarState={this.state.NavbarOpen}/>
                    <header style={{backgroundColor: this.state.backgroundColor}}>
                        <div className={styles.GridTemplate}>
                            <div className={styles.Menu}>
                                <button className={styles.ButtonMenu} onClick={this.NavbarClickHandler}> {/* <img src={menuLogo} className={styles.MenuLogo} /> */} M </button>
                            </div>
                            <div className={styles.BrandNameGrid}>
                                <h2 className={styles.BrandName}>mothersell</h2>
                            </div>
                            <div className={styles.SearchBarDiv}>
                                <img src={SearchLogo} className={styles.SearchLogo} />
                                <input className={styles.SearchBar} placeholder="Search..."/>
                                <button className={styles.ResetButton} type="reset"> <img src={ResetLogo} className={styles.ResetLogo}/></button>
                            </div>
                            <div className={styles.SignUp}>
                                <button className={styles.Button}>Register</button>
                            </div>
                            <div className={styles.Login}>
                                <button className={styles.LoginButton}>Login</button>
                            </div>
                        </div>
                    </header>
                </>
            )
        }
     else {
        return(
            <>
                {console.log(this.state.NavbarOpen)}
                    <Navbar BackdropClickHandler={this.BackdropClickHandler}
                            NavbarState={this.state.NavbarOpen}/>
                    <header style={{backgroundColor: this.state.backgroundColor}}>
                        <div className={styles.GridTemplate}>
                            <div className={styles.Menu}>
                                <button className={styles.ButtonMenu} onClick={this.NavbarClickHandler}> {/* <img src={menuLogo} className={styles.MenuLogo} /> */} M </button>
                            </div>
                            <div className={styles.BrandNameGrid}>
                                <h2 className={styles.BrandName}>mothersell</h2>
                            </div>
                            <div className={styles.SearchBarDiv}>
                                <form className={styles.SearchBarForm}>
                                    <button className={styles.SearchButton} type="submit">
                                        <img src={SearchLogo}  />    
                                    </button>
                                    <input className={styles.SearchBar} placeholder="Search..."/>
                                    <button className={styles.ResetButton} type="reset"> <img src={ResetLogo} className={styles.ResetLogo}/></button>
                                </form>
                            </div>
                            <div className={styles.SignUp}>
                                <button className={styles.Button}>Register</button>
                            </div>
                            <div className={styles.Login}>
                                <button className={styles.LoginButton}>Login</button>
                            </div>
                        </div>
                    </header>
            </>
        )
    }
}
}
