import React, { Component } from 'react';
import axios from 'axios';
// import ImageUploader from 'react-images-upload';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
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
            price: 0,
            discount: "",
            newPrice: "",
            tags: [],
            image: null,
            imageUrl: null,
            category: "",
            description: "",
            tagSearchInput: "",
            tagSuggestions: [],
            categoryOptions: [],
            isUpdated: false
        }
    }

    componentDidMount = async () => {
        let idProduct = parseInt(this.props.match.params.id);
        await fetch(`http://localhost:4000/v1/product/${idProduct}`, {
            crossDomain: true
        })
            .then(res => res.json())
            .then(async res => {
                //console.log(this.props.user.username);
                //console.log(res.data);
                //The following line is to check the response JSON due to the weird structure of the response
                //console.log(res.rows[0]);
                //console.log(res);
                let tags = [];
                for (let i = 0; i < res.rows[0].tags.split(",").length; i++) {
                    await fetch(`http://localhost:4000/v1/tag/${res.rows[0].tags.split(",")[i]}`, { crossDomain: true })
                        .then(res => res.json())
                        .then(results => tags.push(results.rows[0]))
                        .catch(err => err);
                }
                if (res.rows[0] !== undefined) {

                    this.setState({ productAvailability: true });
                    this.setState(
                        {
                            name: res.rows[0].name,
                            price: res.rows[0].price,
                            discount: res.rows[0].discount,
                            tags: tags,
                            imageUrl: res.rows[0].images,
                            category: res.rows[0].category,
                            description: res.rows[0].description
                        });
                }
            })
            .catch(err => {
                console.log(err);
                return null;
            })
        await fetch(`http://localhost:4000/v1/category`, { crossDomain: true })
            .then(res => res.json())
            .then(results => {
                this.setState({ categoryOptions: results.rows });
            })
            .catch(err => err);
    }

    onChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
        // console.log('name: ' + event.target.name)
        // console.log('value: ' + event.target.value);
        console.log(this.props.user.token)

    }

    handleChangeTag = event => {
        this.setState({ tagSearchInput: event.target.value });
        fetch(`http://localhost:4000/v1/tag/namelike/${event.target.value}`, {
            crossDomain: true
        })
            .then(res => res.json())
            .then(results => {
                this.setState({ tagSuggestions: results.rows });
            })
            .catch(err => err);
    };

    selectTag = tag => {
        if (!this.state.tags.find(x => x.id === tag.id)) {
            this.setState({
                tags: [...this.state.tags, tag],
                tagSuggestions: [],
                tagSearchInput: ""
            });
        }
    };

    removeTag = tag => {
        let temporaryArray = this.state.tags;
        let index = this.state.tags.findIndex(x => x.id === tag.id);
        temporaryArray.splice(index, 1);
        this.setState({ tags: temporaryArray });
    };

    handleKeyDownTag = async event => {
        if (event.key === "Enter") {
            event.preventDefault();
            this.state.tagSuggestions.forEach(x => {
                if (this.state.tagSearchInput === x.nameOfTag) {
                    this.selectTag(x);
                }
            });
            if (!this.state.tagSuggestions.find(x => x.nameOfTag === this.state.tagSearchInput) && this.state.tagSearchInput !== "") {
                await fetch('http://localhost:4000/v1/tag', {
                    method: 'POST',
                    mode: 'cors',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        nameOfTag: this.state.tagSearchInput,
                    })
                })
                    .then(res => res.json())
                    .then(result => console.log(result))
                    .catch(err => err);

                await fetch(`http://localhost:4000/v1/tag/name/${this.state.tagSearchInput}`, {
                    crossDomain: true
                })
                    .then(res => res.json())
                    .then(results => {
                        results.rows.forEach(x => {
                            if (this.state.tagSearchInput === x.nameOfTag) {
                                this.selectTag(x);
                            }
                        })
                    })
                    .catch(err => err);
            }
        }
    }

    onSubmit = (event) => {
        event.preventDefault();
        const editedProduct = {
            name: this.state.name,
            price: this.state.price,
            discount: this.state.discount,
            tags: this.state.tags.map(x => x.id).toString(),
            images: this.state.imageUrl,
            category: this.state.category,
            description: this.state.description,
        }

        console.log(editedProduct);

        let idProduct = parseInt(this.props.match.params.id);
        axios.put(`http://localhost:4000/v1/product/${idProduct}`, {
            ...editedProduct
        },
            {
                headers: {
                    'Access-Control-Allow-Origin': '*',
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
        //console.log(this.state)
    };


    render() {
        /* if (!this.state.productAvailability) {

            //console.log(this.state.data);
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
        } */
        if (this.state.isUpdated === false) {
            return (
                <>
                    <div className={styles.background}>

                        <div className={styles.container}>
                            <h2>Change it here</h2>
                            <p>Because you are the man</p>
                            <form>
                                <div className={styles.row}>
                                    <div className={styles.col_25}>
                                        <label htmlFor="productName">Name of the product</label>
                                    </div>
                                    <div className={styles.col_75}>
                                        <input
                                            className={InputStyles.InputField}
                                            type="text"
                                            id="name"
                                            name="name"
                                            placeholder="Name.."
                                            value={this.state.name}
                                            onChange={this.onChange}
                                            onKeyPress={e => { if (e.key === 'Enter') e.preventDefault(); }}
                                        />
                                    </div>
                                </div>
                                <div className={styles.row}>
                                    <div className={styles.col_25}>
                                        <label htmlFor="price">Price</label>
                                    </div>
                                    <div className={styles.col_75}>
                                        <input
                                            className={InputStyles.InputField}
                                            type="number" id="price"
                                            name="price"
                                            placeholder="0"
                                            value={this.state.price}
                                            onChange={this.onChange}
                                            onKeyPress={e => { if (e.key === 'Enter') e.preventDefault(); }}
                                        />
                                    </div>
                                </div>
                                <div className={styles.row} >
                                    <div className={styles.col_25}>
                                        <label htmlFor="discount">Discount</label>
                                    </div>
                                    <div className={styles.col_75}>
                                        <input
                                            className={InputStyles.InputField}
                                            type="number"
                                            min="0"
                                            max="100"
                                            id="discount"
                                            name="discount"
                                            placeholder="0"
                                            onChange={this.newPriceCalculator}
                                            value={this.state.discount}
                                            maxLength="2"
                                            onKeyPress={e => { if (e.key === 'Enter') e.preventDefault(); }}
                                        />
                                    </div>
                                    <div className={styles.col_75}>
                                        <label htmlFor="newPrice"> New price  </label>
                                    </div>
                                    <div className={styles.col_75}>
                                        <input
                                            className={InputStyles.InputField}
                                            type="number"
                                            id="newPrice"
                                            name="newPrice"
                                            onChange={this.discountCalculator}
                                            value={this.state.newPrice}
                                            onKeyPress={e => { if (e.key === 'Enter') e.preventDefault(); }}
                                        />
                                    </div>
                                </div>
                                <div className={styles.row}>
                                    <div className={styles.col_25}>
                                        <label htmlFor="tags">
                                            Tags:
                                                {this.state.tags.map((tag, index) => (
                                                <span className={styles.Span} key={index}>
                                                    {tag.nameOfTag}
                                                    <button
                                                        className={styles.removeTagButton}
                                                        onClick={(event) => {event.preventDefault(); this.removeTag(tag)}}
                                                    >
                                                        x
                                                    </button>
                                                </span>
                                            ))}
                                        </label>
                                    </div>
                                    <div className={styles.col_75}>
                                        <input
                                            className={InputStyles.InputField}
                                            type="text"
                                            onChange={this.handleChangeTag}
                                            id="tags"
                                            name="tags"
                                            placeholder="Find a tag..."
                                            value={this.state.tagSearchInput}
                                            onKeyPress={this.handleKeyDownTag}
                                            autoComplete="off"
                                        />
                                    </div>
                                    <div
                                        className={
                                            this.state.tagSuggestions.length !== 0
                                                ? styles.tagSuggestionsBox
                                                : ""
                                        }
                                    >
                                        {this.state.tagSuggestions.map((tag, index) => (
                                            <button
                                                key={index}
                                                className={styles.tagSuggestions}
                                                onClick={(event) => {event.preventDefault(); this.selectTag(tag)}}
                                            >
                                                {tag.nameOfTag}
                                            </button>
                                        ))}
                                    </div>
                                    <small style={{ color: "gray" }}>If the tag you are looking for is not available, just press Enter and it will be added</small>
                                </div>
                                <div className={styles.col_75}>
                                    <div className={styles.col_25}>
                                        <label htmlFor="category">Category</label>
                                    </div>
                                    <div className={styles.col_75}>
                                        <select
                                            id="category"
                                            onChange={this.handleChange}
                                            name="category"
                                        >
                                            {this.state.categoryOptions.map((x, index) => (
                                                <option key={index} value={x.id}>
                                                    {x.nameOfCategory}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className={styles.row}>

                                    <div className={styles.col_25}>
                                        <label htmlFor="subject">Description</label>
                                    </div>
                                    <div className={styles.col_75}>
                                        <textarea
                                            className={classNames(InputStyles.InputField, InputStyles.Textarea)}
                                            id="description"
                                            name="description"
                                            placeholder="Write something about your selling .."
                                            styles={{ height: 200 }}
                                            value={this.state.description}
                                            onChange={this.onChange}
                                            onKeyPress={e => { if (e.key === 'Enter') e.preventDefault(); }}
                                        />
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
                            <div className="container mb-4 mt-5">
                                <div className={styles.mainCon}>
                                    <div className="row">
                                        <h2 className="text-justify mx-auto  pl-4"> Done successfully</h2>
                                        <div className="col-12">
                                            <img alt="cat" className="img-fluid mx-auto d-block my-2 col-md-3 col-sm-10" src="https://www.datakrat.ru/upload/medialibrary/e6d/Безымянный-22.png"></img>
                                        </div>
                                        <h4 className="text-justify mx-auto pl-4"> Check your <Link to={`/profile`}>profile</Link>  </h4>
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