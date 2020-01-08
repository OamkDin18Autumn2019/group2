import React, { Component } from "react";
import styles from "../CSS/CreateProduct.module.css";
import InputStyles from "../CSS/InputFields.module.css";
import ButtonStyles from "../CSS/Buttons.module.css";
import classNames from "classnames";
import { uploadImage } from "../Utilities/ImageUploadUtility";
import { Link } from 'react-router-dom';

export default class CreateProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      idUser: this.props.user.userId,
      name: "",
      price: 0,
      tags: [],
      image: null,
      imageUrl: null,
      category: "",
      description: "",
      amountOfProduct: 0,
      tagSearchInput: "",
      tagSuggestions: [],
      categoryOptions: [],
      isCreated: false
    };
  }

  componentDidMount() {
    fetch(`http://localhost:4000/v1/category`, { crossDomain: true })
      .then(res => res.json())
      .then(results => {
        this.setState({ categoryOptions: results.rows });
      })
      .catch(err => err);
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

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

        await fetch(`http://localhost:4000/v1/tag/namelike/${this.state.tagSearchInput}`, {
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

  createProduct = event => {
    event.preventDefault();
    let product = {
      idUser: this.state.idUser,
      name: this.state.name,
      price: this.state.price,
      tags: this.state.tags.map(x => x.id).toString(),
      images: this.state.imageUrl,
      category: this.state.category,
      description: this.state.description,
      amountOfProduct: this.state.amountOfProduct
    };
    product = JSON.stringify(product);
    fetch(`http://localhost:4000/v1/product/`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: product
    })
      .then(res => res.json())
      .then(async result => {
        console.log(result);
        await this.setState({
          isCreated: true
        })
        setTimeout(() => this.props.history.push('/profile'), 3000);
      })
      .catch(err => console.log(err));

  };

  uploadImageToWeb = async e => {
    e.preventDefault();
    let newState = this.state;
    newState.image = e.target.files[0];
    this.setState({
      ...newState
    });
    console.log(this.state);
    const imageUploadRes = await uploadImage(e);
    console.log(imageUploadRes);
    newState = this.state;
    newState.imageUrl = imageUploadRes;
    this.setState({ ...newState });
  };

  render() {
    if (this.state.isCreated === false) {
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
                      required
                      type="number"
                      id="price"
                      onChange={this.handleChange}
                      name="price"
                      min="0"
                      placeholder="0"
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
                  <small style={{color: "gray"}}>If the tag you are looking for is not available, just press Enter and it will be added</small>
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
                      min="0"
                      placeholder="0"
                      onKeyPress={e => { if (e.key === 'Enter') e.preventDefault(); }}
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
                    </select>
                  </div>
                </div>
                <div className={styles.row}>
                  <div className={styles.col_25}>
                    <label htmlFor="images">Image </label>
                  </div>
                  {this.state.image == null ? (
                    <input
                      display={this.state.image == null ? "visible" : "none"}
                      type="file"
                      name="productImage"
                      onChange={e => this.uploadImageToWeb(e)}
                      accept="image/png, image/jpeg, image/jpg"
                    ></input>
                  ) : (
                      <img
                        width="100"
                        height="100"
                        alt="Product"
                        src={URL.createObjectURL(this.state.image)}
                      ></img>
                    )}
                </div>
                <div className={styles.row}>
                  <div className={styles.col_25}>
                    <label htmlFor="subject">Description</label>
                  </div>
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
                      onKeyPress={e => { if (e.key === 'Enter') e.preventDefault(); }}
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
      )
    } else {
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
