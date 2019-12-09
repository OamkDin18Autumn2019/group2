import React, { Component } from 'react';
import axios from 'axios';
// import ImageUploader from 'react-images-upload';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from 'react-loader-spinner';
import LoaderStyle from '../CSS/Loader.module.css';
import styles from '../CSS/CreateProduct.module.css';
// import classNames from 'classnames';
// import { FaSlidersH } from 'react-icons/fa';


export default class EditProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productAvailability: false,
            amount: 1,
            name: "",
            price: "",
            discount: "",
            newPrice: "",
            tags: "",
            // images: "",
            images: [],
            category: "",
            description: "",
        }
    }

    componentDidMount = () => {
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
                    this.setState( 
                    {
                        name: res.data.rows[0].name,
                        price: res.data.rows[0].price,
                        discount: res.data.rows[0].discount,
                        tags: res.data.rows[0].tags,
                        images: res.data.rows[0].images,
                        category: res.data.rows[0].category,
                        description: res.data.rows[0].description
                    });

                }
            })
            .catch(err => {
                console.log(err);
                return null;
            })
    }

    onChange = (event) => {
        this.setState({ [event.target.name] : event.target.value });
        // console.log('name: ' + event.target.name)
        // console.log('value: ' + event.target.value);
    }

    onSubmit = () => {

        const editedProduct = {
            name: this.state.name,
            price: this.state.price,
            discount: this.state.discount,
            tags: this.state.tags,
            images: this.state.images,
            description: this.state.description,
        }
        
        console.log(editedProduct);

        let idProduct = parseInt(this.props.match.params.id);
        axios.put(`http://localhost:4000/v1/product/${idProduct}`,   {
            ...editedProduct
          },
          {
            headers: {
              Authorization: this.props.user.token
            }
        })
            .then(res => {
                console.log(res);
                
            })
            .catch(err => {
                console.log(err);
                return null;
            })
            this.props.history.goBack();
    }
    
    newPriceCalculator = (event) => {
        console.log("event.target: " + event.target.name);
        this.setState({ [event.target.name] : event.target.value });

        // The solution below is a temporary one. I will implement async functions or something else
        // BR: Nursultan
        setTimeout(() => {
            let calculatedNewPrice = (this.state.price * (100 - this.state.discount)/100);
            this.setState({newPrice: calculatedNewPrice });
            console.log(calculatedNewPrice);
        }, 1);
    }

    discountCalculator = (event) => {
        console.log("event.target: " + event.target.name);
        this.setState({ [event.target.name] : event.target.value });

        // The solution below is a temporary one. I will implement async functions or something else
        // BR: Nursultan
        setTimeout(() => {
            let calculatedDiscount = (100 - ((this.state.newPrice / this.state.price) * 100));
            this.setState({discount: calculatedDiscount });
            console.log(calculatedDiscount);
        }, 1);
    }

    // onDrop = (image) => {
    //     this.setState({
    //         images: this.state.images.concat(image),
    //     });
    //     console.log(this.state.images);
    // }

    render() {
            if (!this.state.productAvailability) {
       
                console.log(this.state.data);
                return(
                    <div>
                        <Loader 
                            type="Triangle"
                            color="#000"
                            height={150}
                            width={150}
                            timeout={3000}
                            className={LoaderStyle.Loader}
                        />
                    </div>
                )
            } else {
                return(
                    <>
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
                                        <input type="text" id="name" name="name" placeholder="Name.." value={this.state.name} onChange={this.onChange}  />
                                    </div>
                                </div>
                                <div className={styles.row}>
                                    <div className={styles.col_25}>
                                        <label for="price">Price</label>
                                    </div>
                                    <div className={styles.col_75}>
                                        <input type="number" id="price" name="price" placeholder="0" value={this.state.price} onChange={this.onChange} /> €
                                    </div>
                                </div>
                                <div className={styles.row} >
                                    <div className={styles.col_25}>
                                        <label for="discount">Discount</label>
                                    </div>
                                    <div className={styles.col_75}>
                                        <input type="number" min="0" max="100" id="discount" name="discount" placeholder="0" onChange={this.newPriceCalculator} value={this.state.discount} maxlength="2" /> %
                                    </div>
                                    <div className={styles.col_75}>
                                        <label for="newPrice"> New price  </label>
                                    </div>
                                    <div className={styles.col_75}>
                                        <input type="number" id="newPrice" name="newPrice"  onChange={this.discountCalculator} value={this.state.newPrice} /> €
                                    </div>
                                </div>
                                <div className={styles.row}>
                                    <div className={styles.col_25}>
                                        <label for="tags">Tags (for better search)</label>
                                    </div>

                                    <div className={styles.col_75}>
                                        <input type="text" id="tags" name="tags" placeholder="Tags..." value={this.state.tags} onChange={this.onChange} />
                                    </div>
                                </div>
                                <div className={styles.col_75}>
                                    <div className={styles.col_25}>
                                        <label for="category">Category</label>
                                    </div>
                                    <div className={styles.col_75} >
                                        <select id="category" name="category" selected={this.state.category} onChange={this.onChange}>
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
                                        <textarea id="description" name="description" placeholder="Write something about your selling .." styles={{ height: 200 }} value={this.state.description} onChange={this.onChange} ></textarea>
                                    </div>
                                </div>
                                <div className={styles.row}>
                                    <div className={styles.col_25}>
                                        <label for="images">Images </label>
                                    </div>
                                    {/* <ImageUploader 
                                        withIcon={true}
                                        buttonText='Choose images'
                                        onChange={this.onDrop}
                                        imgExtension={['.jpg', '.gif', '.png', '.gif']}
                                        maxFileSize={5242880}
                                        withPreview={true}
                                        singleImage={true}
                                    /> */}
                                    <div className={styles.col_75}>
                                        <input type="text" id="images" name="images" placeholder="Put the link here..." value={this.state.images} onChange={this.onChange} />
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