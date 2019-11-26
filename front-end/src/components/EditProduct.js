import React, { Component } from 'react';
import Header from './Header';
import axios from 'axios';
import styles from '../CSS/CreateProduct.module.css';
import classNames from 'classnames';
import { FaSlidersH } from 'react-icons/fa';


export default class EditProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productAvailability: false,
            amount: 1,
            data: {
                name: "",
                price: "",
                discount: "",
                tags: "",
                images: "",
                category: "",
                description: ""
            },
            newData: {
                name: "",
                price: "",
                discount: "",
                tags: "",
                images: "",
                category: "",
                description: ""
            }
        }
    }

    componentDidMount() {
        const toBeEditedData = ["name", "price", "discount", "tags", "images", "category", "description"];
        let idProduct = parseInt(this.props.match.params.id);
    
        console.log(this.props.user.token)
        axios.get(`http://localhost:4000/v1/product/${idProduct}`, {
            headers: {
                'x-access-token': this.props.user.token
            }
        })
            .then(res => {
                console.log(this.props.user.username);
                console.log(res.data);
                //The following line is to check the response JSON due to the weird structure of the response
                console.log(res.data.rows[0]);
                if (res.data.rows[0] !== undefined) {
                    this.setState({ productAvailability: true });
                    this.setState({data: {
                        name: res.data.rows[0].name,
                        price: res.data.rows[0].price,
                        discount: res.data.rows[0].discount,
                        tags: res.data.rows[0].tags,
                        images: res.data.rows[0].images,
                        category: res.data.rows[0].category,
                        description: res.data.rows[0].description
                    }, newData: {
                        name: res.data.rows[0].name,
                        price: res.data.rows[0].price,
                        discount: res.data.rows[0].discount,
                        tags: res.data.rows[0].tags,
                        images: res.data.rows[0].images,
                        category: res.data.rows[0].category,
                        description: res.data.rows[0].description
                    }                        
                    });
                    // let product = this.state.data;
                    // let editedData = product.filter((item) => item === toBeEditedData.map());
                    console.log(this.state.data);
                    // let editedData = product.filter((item) => item === "name");
                    // console.log(editedData);
                }
            })
            .catch(err => {
                console.log(err);
                return null;
            })
    }

    onChange = (event) => {
        this.setState({newData: [event.target.name] = event.target.value });
    }

    onSubmit = () => {

        const editedProduct = this.state.newData;
        // const newEditedProduct = editedProduct.slice(0, 2 );
        // console.log(newEditedProduct);

        let idProduct = parseInt(this.props.match.params.id);
        axios.put(`http://localhost:3000/v1/product/${idProduct}`, {
            // headers: {
            //     'x-access-token': this.props.user.token
            // }
            ...editedProduct
        })
            .then(res => {
                console.log(res);
                // this.setState({data:  });
            })
            .catch(err => {
                console.log(err);
                return null;
            })
    }

    render() {
            if (!this.state.data) {
       
                console.log(this.state.data);
                return(
                    <div>
                        Loading...
                    </div>
                )
            } else {
                return(
                    <>
                    <Header user={this.props.user} />
                    <div className={styles.background}>

                        <div className={styles.container}>
                            <h2>Change it here</h2>
                            <p>Because you are the man</p>
                            <form>
                                <div className={styles.row}>
                                    <div className={styles.col_25}>
                                        <label for="productName">Name of the product</label>
                                    </div>
                                    <div className={styles.col_75}>
                                        <input type="text" id="name" name="name" placeholder="Name.." value={this.state.newData.name} onChange={this.onChange}  />
                                    </div>
                                </div>
                                <div className={styles.row}>
                                    <div className={styles.col_25}>
                                        <label for="price">Price</label>
                                    </div>
                                    <div className={styles.col_75}>
                                        <input type="number" id="price" name="price" placeholder="0" value={this.state.newData.price} onChange={this.onChange} />
                                    </div>
                                </div>
                                <div className={styles.row} >
                                    <div className={styles.col_25}>
                                        <label for="discount">Discount</label>
                                    </div>
                                    <div className={styles.col_75}>
                                        <input type="number" min="0" max="100" id="discount" name="discount" placeholder="0" value={this.state.newData.discount} onChange={this.onChange} />
                                    </div>
                                </div>
                                <div className={styles.row}>
                                    <div className={styles.col_25}>
                                        <label for="tags">Tags (for better search)</label>
                                    </div>

                                    <div className={styles.col_75}>
                                        <input type="text" id="tags" name="tags" placeholder="Tags..." value={this.state.newData.tags} onChange={this.onChange} />
                                    </div>
                                </div>
                                <div className={styles.row}>
                                    <div className={styles.col_25}>
                                        <label for="images">Images </label>
                                    </div>

                                    <div className={styles.col_75}>
                                        <input type="text" id="images" name="images" placeholder="Put the link here..." value={this.state.newData.images} onChange={this.onChange} />
                                    </div>
                                </div>
                                <div className={styles.col_75}>
                                    <div className={styles.col_25}>
                                        <label for="category">Category</label>
                                    </div>
                                    <div className={styles.col_75} >
                                        <select id="category" name="category" selected={this.state.newData.category} onChange={this.onChange}>
                                            <option value="bikes">Bikes</option>
                                            <option value="clothes">Clothes</option>
                                            <option value="forHome">For home</option>
                                            <option value="shoes">Shoes</option>
                                        </select>
                                    </div>
                                </div>
                                <div className={styles.row}>

                                    <div className={styles.col_25}>
                                        <label for="subject">Description</label>
                                    </div>
                                    <div className={styles.col_75}>
                                        <textarea id="description" name="description" placeholder="Write something about your selling .." styles={{ height: 200 }} value={this.state.newData.description} ></textarea>
                                    </div>
                                </div>
                                <div className={styles.row}>
                                    <input type="button" value="Submit" onClick={this.onSubmit}  />
                                </div>
                            </form>
                        </div>
                    </div>
                    </>
                )
            }
    }
}