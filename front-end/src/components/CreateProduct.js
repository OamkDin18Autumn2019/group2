import React, { Component } from 'react';
import Header from './Header';
import axios from 'axios';
import styles from '../CSS/CreateProduct.module.css';
import classNames from 'classnames';


export default class CreateProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      idUser: 1,
      name: "",
      price: 0,
      tags: "",
      images: "",
      category: "",
      description: "",
      amountOfProduct: 0
    }
  }
  handleChange = (event) => {
    // console.log(this.state)
    this.setState({ [event.target.name]: event.target.value });
  }
  createProduct = (event) => {
    event.preventDefault();
    const product = {
      ...this.state
    }
    axios.post(`http://localhost:4000/v1/product/`, {
      // headers: {
      //     'x-access-token': this.props.user.token
      // },
      ...product

    })
    .then(result => console.log(result))
    .catch(err => console.log(err))
  }

  render() {
    return (
      <>
        <Header />
        <div className={styles.background}>

          <div className={styles.container}>
            <h2>Add your thing for selling</h2>
            <p>Why not to use this beautiful form here?</p>
            <form onSubmit={this.createProduct}>
              <div className={styles.row}>
                <div className={styles.col_25}>
                  <label for="productName">Name of the product</label>
                </div>
                <div className={styles.col_75}>
                  <input required type="text" onChange={this.handleChange} id="name" name="name" placeholder="Name.." />
                </div>
              </div>
              <div className={styles.row}>
                <div className={styles.col_25}>
                  <label for="price">Price</label>
                </div>
                <div className={styles.col_75}>
                  <input required type="number" id="price" onChange={this.handleChange} name="price" min="0" placeholder="0" />
                </div>
              </div>
              <div className={styles.row}>
                <div className={styles.col_25}>
                  <label for="tags">Tags (for better search)</label>
                </div>

                <div className={styles.col_75}>
                  <input required type="text" onChange={this.handleChange} id="tags" name="tags" placeholder="Tags..." />
                </div>
              </div>
              <div className={styles.row}>
                <div className={styles.col_25}>
                  <label for="amountOfProduct">Amount</label>
                </div>
                <div className={styles.col_75}>
                  <input required type="number" id="amount" onChange={this.handleChange} name="amountOfProduct" placeholder="1" />
                </div>
              </div>
              <div className={styles.row}>
                <div className={styles.col_25}>
                  <label for="images">Images </label>
                </div>

                <div className={styles.col_75}>
                  <input required type="text" id="images" onChange={this.handleChange} name="images" placeholder="Put the link here..." />
                </div>
              </div>
              <div className={styles.col_75}>
                <div className={styles.col_25}>
                  <label for="category">Category</label>
                </div>
                <div className={styles.col_75}>
                  <select id="category" onChange={this.handleChange} name="category">
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
                  <textarea id="description" onChange={this.handleChange} name="description" placeholder="Write something about your selling .." styles={{ height: 200 }}></textarea>
                </div>
              </div>
              <div className={styles.row}>
                <input required type="submit" value="Submit" />
              </div>
            </form>
          </div>
        </div>

      </>
    )

  }
}

