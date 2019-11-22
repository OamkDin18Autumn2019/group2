
import React from 'react';
// import { Link } from 'react-router-dom';
import styles from '../CSS/LandingPage.module.css';


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

        return (
            <>
                <div className={styles.img_block}>
                    <a className={styles.content_block}><img alt="product" src={this.props.children} />
                        <div className={styles.over_block}></div>
                      
                        <span>45$</span>
                    </a>
                </div>
            </>
        )
    }
}
