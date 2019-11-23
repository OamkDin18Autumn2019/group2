import React, { Component } from 'react';
import Header from './Header';
import axios from 'axios';
import styles from '../CSS/CreateProduct.module.css';
import classNames from 'classnames';
import { FaSlidersH } from 'react-icons/fa';


export default class CreateProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productAvailability: false,
            amount: 1,
            data: null
        }
    }
    componentDidMount() {
        let idProduct = parseInt(this.props.match.params.id);
        console.log(this.props.user.token)
        axios.get(`http://localhost:3000/v1/product/${idProduct}`, {
            headers: {
                'x-access-token': this.props.user.token
            }
        })
            .then(res => {
                console.log(this.props.user);
                console.log(res.data);
                //The following line is to check the response JSON due to the weird structure of the response
                console.log(res.data.rows[0]);
                if (res.data.rows[0] !== undefined) {
                    this.setState({ productAvailability: true, data: res.data.rows[0] });
                }

            })
            .catch(err => {
                console.log(err);
                return null;
            })
    }


    render() {
        return (
            <>
                <Header />
                <div className={styles.background}>

                    <div className={styles.container}>
                        <h2>Change it here</h2>
                        <p>Because you are the man</p>
                        <form action="#">
                            <div className={styles.row}>
                                <div className={styles.col_25}>
                                    <label for="productName">Name of the product</label>
                                </div>
                                <div className={styles.col_75}>
                                    <input type="text" id="name" name="name" placeholder="Name.." />
                                </div>
                            </div>
                            <div className={styles.row}>
                                <div className={styles.col_25}>
                                    <label for="price">Price</label>
                                </div>
                                <div className={styles.col_75}>
                                    <input type="number" id="price" name="price" value='0' placeholder="0" />
                                </div>
                            </div>
                            <div className={styles.row}>
                                <div className={styles.col_25}>
                                    <label for="tags">Tags (for better search)</label>
                                </div>

                                <div className={styles.col_75}>
                                    <input type="text" id="tags" name="tags" placeholder="Tags..." />
                                </div>
                            </div>
                            <div className={styles.row}>
                                <div className={styles.col_25}>
                                    <label for="images">Images </label>
                                </div>

                                <div className={styles.col_75}>
                                    <input type="text" id="images" name="images" placeholder="Put the link here..." />
                                </div>
                            </div>
                            <div className={styles.col_75}>
                                <div className={styles.col_25}>
                                    <label for="category">Category</label>
                                </div>
                                <div className={styles.col_75}>
                                    <select id="category" name="category">
                                        <option value="bikes">Bikes</option>
                                        <option value="clothes">Clothes</option>
                                        <option value="forHome">For home</option>
                                    </select>
                                </div>
                            </div>
                            <div className={styles.row}>

                                <div className={styles.col_25}>
                                    <label for="subject">Description</label>
                                </div>
                                <div className={styles.col_75}>
                                    <textarea id="description" name="description" placeholder="Write something about your selling .." styles={{ height: 200 }}></textarea>
                                </div>
                            </div>
                            <div className={styles.row}>
                                <input type="submit" value="Submit" />
                            </div>
                        </form>
                    </div>
                </div>

            </>
        )

    }
}

