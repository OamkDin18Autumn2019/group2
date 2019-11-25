import React, { Component } from 'react';
import Header from './Header';
import axios from 'axios';
import styles from '../CSS/CreateProduct.module.css';
import classNames from 'classnames';


export default class CreateProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
         
        }
    }
  
    render() {
            return (
              <>
        <Header user={this.props.user} />      
        <div className={styles.background}>
        <div className={styles.container}>
        <h2>Add your thing for selling</h2>
        <p>Why not to use this beautiful form here?</p>
          <form action="#">
          <div className={styles.row}>
            <div className={styles.col_25}>
              <label for="productName">Name of the product</label>
            </div>
            <div className={styles.col_75}>
              <input type="text" id="name" name="name" placeholder="Name.."/>
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.col_25}>
              <label for="price">Price</label>
            </div>
            <div className={styles.col_75}>
              <input type="number" id="price" name="price" placeholder="Price"/>
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.col_25}>
              <label for="tags">Tags (for better search)</label>
            </div>
            
            <div className={styles.col_75}>
              <input type="text" id="tags" name="tags" placeholder="Tags..."/>
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.col_25}>
              <label for="images">Images </label>
            </div>
            
            <div className={styles.col_75}>
              <input type="url" id="images" name="images" placeholder="Put the link here..."/>
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
              <textarea id="description" name="description" placeholder="Write something about your good..." styles = {{height: 200}}></textarea>
            </div>
          </div>
          <div className={styles.row}>
            <input type="submit" value="Submit"/>
          </div>
          </form>
        </div>
        </div>
            
              </>
            )
        
    }
}

