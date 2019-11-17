
import React from 'react';
// import Navbar from './Navbar';
import { Link }  from 'react-router-dom';
import styles from '../CSS/LandingPage.module.css';
// import menuLogo from '../icons/icons8-menu-50.png';


// const loggedIn = 0;

export default class Product extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
         showProduct: styles.hide
        }
      }
      showMore = () => {
          console.log(this.props.showProduct)
          if (this.state.showProduct === styles.hide) {
            this.setState({
                showProduct: styles.showMoreInfo
            })   
          } else {
            this.setState({
                showProduct: styles.hide
            })   
          }
       
      }
     
    render() {
     
        return(            
            <>
            <div className={styles.container} onClick = { this.showMore }>
                <div >
                    <img src="https://source.unsplash.com/random/207x206" alt="img" />
                </div>
            </div>
            <div className = { this.state.showProduct }>
                asdasd
            </div>


        </>
        )
    }
}
