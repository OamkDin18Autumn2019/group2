import React, { Component } from 'react';
import axios from 'axios';
// import ImageUploader from 'react-images-upload';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from 'react-loader-spinner';
import LoaderStyle from '../CSS/Loader.module.css';
import styles from '../CSS/CreateProduct.module.css';
import InputStyles from '../CSS/InputFields.module.css';
import ButtonStyles from '../CSS/Buttons.module.css';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { uploadImage } from "../Utilities/ImageUploadUtility";

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
            images: [],
            imageUrl: null,
            category: "",
            description: "",
            isUpdated: false
        }
    }

    componentDidMount = () => {
        let idProduct = parseInt(this.props.match.params.id);
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
                    console.log(this.state)
                }
            })
            .catch(err => {
                console.log(err);
                return null;
            })
    }

    onChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
        // console.log('name: ' + event.target.name)
        // console.log('value: ' + event.target.value);
        console.log(this.props.user.token)

    }

    onSubmit = () => {

        const editedProduct = {
            name: this.state.name,
            price: this.state.price,
            discount: this.state.discount,
            tags: this.state.tags,
            images: this.state.imageUrl,
            description: this.state.description,
        }

        console.log(editedProduct);

        let idProduct = parseInt(this.props.match.params.id);
        axios.put(`http://localhost:4000/v1/product/${idProduct}`, {
            ...editedProduct
        },
            {
                headers: {
                    Authorization: this.props.user.token
                }
            })
            .then(res => {
                console.log(res);
                this.setState({
                    isUpdated: true
                })
                setTimeout(() => this.props.history.goBack(), 3000);
            })
            .catch(err => {
                console.log(err);
                return null;
            })
        // this.props.history.goBack();
    }

    newPriceCalculator = (event) => {
        console.log("event.target: " + event.target.name);
        this.setState({ [event.target.name]: event.target.value });

        // The solution below is a temporary one. I will implement async functions or something else
        // BR: Nursultan
        setTimeout(() => {
            let calculatedNewPrice = (this.state.price * (100 - this.state.discount) / 100);
            this.setState({ newPrice: calculatedNewPrice });
            console.log(calculatedNewPrice);
        }, 1);
    }

    discountCalculator = (event) => {
        console.log("event.target: " + event.target.name);
        this.setState({ [event.target.name]: event.target.value });

        // The solution below is a temporary one. I will implement async functions or something else
        // BR: Nursultan
        setTimeout(() => {
            let calculatedDiscount = (100 - ((this.state.newPrice / this.state.price) * 100));
            this.setState({ discount: calculatedDiscount });
            console.log(calculatedDiscount);
        }, 1);
    }

    uploadImageToWeb = async e => {
        e.preventDefault();
        let newState = this.state;
        newState.images = e.target.files[0];
        this.setState({
            ...newState
        });
        console.log(this.state);
        const imageUploadRes = await uploadImage(e);

        console.log(imageUploadRes);
        newState = this.state;
        newState.imageUrl = imageUploadRes;
        this.setState({ ...newState });
        console.log(this.state)
    };


    render() {
        if (!this.state.productAvailability) {

            console.log(this.state.data);
            return (
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
        }
        if (this.state.productAvailability && this.state.isUpdated === false) {
            return (
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
                                        <input className={InputStyles.InputField} type="text" id="name" name="name" placeholder="Name.." value={this.state.name} onChange={this.onChange} />
                                    </div>
                                </div>
                                <div className={styles.row}>
                                    <div className={styles.col_25}>
                                        <label for="price">Price</label>
                                    </div>
                                    <div className={styles.col_75}>
                                        <input className={InputStyles.InputField} type="number" id="price" name="price" placeholder="0" value={this.state.price} onChange={this.onChange} />
                                    </div>
                                </div>
                                <div className={styles.row} >
                                    <div className={styles.col_25}>
                                        <label for="discount">Discount</label>
                                    </div>
                                    <div className={styles.col_75}>
                                        <input className={InputStyles.InputField} type="number" min="0" max="100" id="discount" name="discount" placeholder="0" onChange={this.newPriceCalculator} value={this.state.discount} maxlength="2" />
                                    </div>
                                    <div className={styles.col_75}>
                                        <label for="newPrice"> New price  </label>
                                    </div>
                                    <div className={styles.col_75}>
                                        <input className={InputStyles.InputField} type="number" id="newPrice" name="newPrice" onChange={this.discountCalculator} value={this.state.newPrice} />
                                    </div>
                                </div>
                                <div className={styles.row}>
                                    <div className={styles.col_25}>
                                        <label className={InputStyles.InputField} for="tags">Tags (for better search)</label>
                                    </div>

                                    <div className={styles.col_75}>
                                        <input className={InputStyles.InputField} type="text" id="tags" name="tags" placeholder="Tags..." value={this.state.tags} onChange={this.onChange} />
                                    </div>
                                </div>
                                <div className={styles.col_75}>
                                    <div className={styles.col_25}>
                                        <label for="category">Category</label>
                                    </div>
                                    <div className={styles.col_75} >
                                        <select className={InputStyles.InputField} id="category" name="category" selected={this.state.category} onChange={this.onChange}>
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
                                        <textarea className={classNames(InputStyles.InputField, InputStyles.Textarea)} id="description" name="description" placeholder="Write something about your selling .." styles={{ height: 200 }} value={this.state.description} onChange={this.onChange} ></textarea>
                                    </div>
                                </div>
                                <div className={styles.row}>
                                    <div className={styles.row}>
                                        <div className={styles.col_25}>
                                            <label htmlFor="images">Image </label>
                                        </div>

                                        <input
                                            display={this.state.image == null ? "visible" : "none"}
                                            type="file"
                                            name="productImage"
                                            onChange={e => this.uploadImageToWeb(e)}
                                            accept="image/png, image/jpeg, image/jpg"
                                        ></input>
                                        <img
                                            width="100"
                                            height="100"
                                            alt="Product"
                                            src={(this.state.imageUrl !== null) ? `http://localhost:4000/${this.state.imageUrl}` : `http://localhost:4000/${this.state.images}`}

                                        ></img>
                                    </div>
                                </div>
                                <div className={classNames(styles.row, styles.SubmitBox)}>
                                    <input className={ButtonStyles.SubmitButton} type="button" value="Submit" onClick={this.onSubmit} />
                                </div>
                            </form>
                        </div>
                    </div>
                </>
            )
        }
        if (this.state.isUpdated === true) {
            return (
                <>
                    <div className={styles.background}>
                        <div className={styles.container}>
                            <div class="container mb-4 mt-5">
                                <div className={styles.mainCon}>
                                    <div class="row">
                                        <h2 class="text-justify mx-auto  pl-4"> Done successfully</h2>
                                        <div class="col-12">
                                            <img alt="cat" class="img-fluid mx-auto d-block my-2 col-md-3 col-sm-10" src="https://www.datakrat.ru/upload/medialibrary/e6d/Безымянный-22.png"></img>
                                        </div>
                                        <h4 class="text-justify mx-auto pl-4"> Check your <Link to={`/profile`}>profile</Link>  </h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )
        }
    }
}