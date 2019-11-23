
import React from 'react';
// import { Link } from 'react-router-dom';
import styles from '../CSS/LandingPage.module.css';

import StarRatings from 'react-star-ratings';

export default class Product extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showProduct: styles.hide
        }
    }
     changeRating = ( newRating, name ) => {
        console.log(newRating)
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
                        <div className={styles.over_block}>
                          
                        </div>

                        <span>45$
                            <div className={styles.stars}>
                            <StarRatings
                            //    svgIconViewBox ='12 12 20 21'
                            // ignoreInlineStyles = { true}
                               starDimension = '35px'
                               rating={2}
                            //    isAggregateRating = { false}
                            //    isSelectable= {false}
                               starHoverColor ='yellow'
                               starRatedColor = 'yellow'
                               starEmptyColor = 'white'
                               //   starRatedColor="yellow"
                               changeRating={this.changeRating}
                               numberOfStars={5}
                               // name='rating'
                               
                               starSpacing = '1px'
                           />
                           
                            </div>
                            </span>
                        
                    </a>
                </div>
            </>
        )
    }
}
