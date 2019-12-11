import React, { Component } from "react";
import axios from "axios";
import styles from "../CSS/CreateProduct.module.css";
import InputStyles from "../CSS/InputFields.module.css";
import ButtonStyles from "../CSS/Buttons.module.css";
import classNames from "classnames";
import ImageUploader from "react-images-upload";

export default class CreateProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      idUser: 1,
      name: "",
      price: 0,
      tags: [],
      images: "",
      category: "",
      description: "",
      amountOfProduct: 0,
      tagSearchInput: "",
      tagSuggestions: [],
      categoryOptions: []
    };
  }

  componentDidMount() {
    fetch(`http://localhost:4000/v1/category`, { crossDomain: true })
      .then(res => res.json())
      .then(results => {
        console.log(results.rows);
        this.setState({ categoryOptions: results.rows });
      })
      .catch(err => err);
  }

  handleChange = event => {
    // console.log(this.state)
    this.setState({ [event.target.name]: event.target.value });
  };

  handleChangeTag = event => {
    this.setState({ tagSearchInput: event.target.value });
    fetch(`http://localhost:4000/v1/tag/name/${event.target.value}`, {
      crossDomain: true
    })
      .then(res => res.json())
      .then(results => {
        console.log(results.rows);
        this.setState({ tagSuggestions: results.rows });
      })
      .catch(err => err);
  };

  selectTag = tag => {
    console.log("selected tag: ", tag);
    if (!this.state.tags.find(x => x.id === tag.id)) {
      this.setState({
        tags: [...this.state.tags, tag],
        tagSuggestions: [],
        tagSearchInput: ""
      });
    }
  };

  removeTag = tag => {
    console.log("removed tag: ", tag);
    let temporaryArray = this.state.tags;
    let index = this.state.tags.findIndex(x => x.id === tag.id);
    temporaryArray.splice(index, 1);
    this.setState({ tags: temporaryArray });
  };

  createProduct = event => {
    event.preventDefault();
    let product = {
      idUser: this.state.idUser,
      name: this.state.name,
      price: this.state.price,
      tags: this.state.tags.map(x => x.id).toString(),
      images: this.state.images,
      category: this.state.category,
      description: this.state.description,
      amountOfProduct: this.state.amountOfProduct
    };
    product = JSON.stringify(product);
    console.log("create product: ", product);
    fetch(`http://localhost:4000/v1/product/`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: product
    })
      .then(res => res.json())
      .then(result => console.log(result))
      .catch(err => console.log(err));
    /* axios.post(`http://localhost:4000/v1/product/`, {
      // headers: {
      //     'x-access-token': this.props.user.token
      // },
      product

    })
      .then(result => console.log(result))
      .catch(err => console.log(err)) */
  };

  render() {
    return (
      <>
        <div className={styles.background}>
          <div className={styles.container}>
            <h2>Add your thing for selling</h2>
            <p>Why not to use this beautiful form here?</p>
            <form onSubmit={this.createProduct}>
              <div className={styles.row}>
                <div className={styles.col_25}>
                  <label htmlFor="productName">Name of the product</label>
                </div>
                <div className={styles.col_75}>
                  <input
                    className={InputStyles.InputField}
                    required
                    type="text"
                    onChange={this.handleChange}
                    id="name"
                    name="name"
                    placeholder="Name.."
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
                    required
                    type="number"
                    id="price"
                    onChange={this.handleChange}
                    name="price"
                    min="0"
                    placeholder="0"
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
                          onClick={() => this.removeTag(tag)}
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
                      onClick={() => this.selectTag(tag)}
                    >
                      {tag.nameOfTag}
                    </button>
                  ))}
                </div>
              </div>
              <div className={styles.row}>
                <div className={styles.col_25}>
                  <label htmlFor="amountOfProduct">Amount</label>
                </div>
                <div className={styles.col_75}>
                  <input
                    className={InputStyles.InputField}
                    required
                    type="number"
                    id="amount"
                    onChange={this.handleChange}
                    name="amountOfProduct"
                    placeholder="1"
                  />
                </div>
              </div>
              <div className={styles.row}>
                <div className={styles.col_25}>
                  <label htmlFor="images">Images </label>
                </div>

                <div className={styles.col_75}>
                  <input
                    className={InputStyles.InputField}
                    required
                    type="text"
                    id="images"
                    onChange={this.handleChange}
                    name="images"
                    placeholder="Put the link here..."
                  />
                </div>
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
                    {/* <option value="bikes">Bikes</option>
                    <option value="clothes">Clothes</option>
                    <option value="forHome">For home</option> */}
                  </select>
                </div>
              </div>
              <div className={styles.row}>
                <div className={styles.col_25}>
                  <label htmlFor="subject">Description</label>
                </div>
                <ImageUploader
                  withIcon={true}
                  buttonText="Choose images"
                  onChange={this.onDrop}
                  imgExtension={[".jpg", ".png"]}
                  maxFileSize={5242880}
                  withPreview={true}
                  singleImage={true}
                />
                <div className={styles.col_75}>
                  <textarea
                    className={classNames(
                      InputStyles.InputField,
                      InputStyles.Textarea
                    )}
                    id="description"
                    onChange={this.handleChange}
                    name="description"
                    placeholder="Write something about your selling .."
                    styles={{ height: 300 }}
                  ></textarea>
                </div>
              </div>
              <div className={styles.row}>
                <input
                  className={ButtonStyles.SubmitButton}
                  required
                  type="submit"
                  value="Submit"
                />
              </div>
            </form>
          </div>
        </div>
      </>
    );
  }
}
