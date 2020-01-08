import React from 'react';
//import classNames from 'classnames';
import styles from '../CSS/SearchPage.module.css';
import { FiFilter } from 'react-icons/fi';
import { FaRegFile } from 'react-icons/fa';
import { IconContext } from "react-icons";
//import Header from './Header';
//import Footer from './Footer';
import VerticalProductDisplay from './SearchProductDisplay';
/**
 * This function is to remove commas, dots and duplicated spaces
 * @param {str} str String
 */
const processSearch = (str) => {
    let tempStr = str.replace("?q=", "");
    tempStr = tempStr.replace(".", " ");
    tempStr = tempStr.replace(",", " ");
    tempStr = tempStr.replace(/\s+/g, ' ');
    tempStr = tempStr.trim();
    let temp_array = tempStr.split(" ");
    temp_array = [...new Set(temp_array)];
    return temp_array.join(" ");
}


export default class SearchPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            lastQuery: null
        }
    }

    componentDidMount() {
        let temp_query = decodeURIComponent(this.props.location.search);
        temp_query = processSearch(temp_query);
        temp_query = encodeURIComponent(temp_query);
        console.log("query: ", temp_query);
        fetch('http://localhost:4000/v1/search?q=' + temp_query, { crossDomain: true })
            .then(res => res.json())
            .then(results => {
                //console.log("fetch results: ", results.rows);
                if (temp_query !== 0) {
                    this.setState({ data: results.rows, lastQuery: temp_query });
                }
            })
            .catch(err => err)
    }

    componentDidUpdate() {
        let temp_query = decodeURIComponent(this.props.location.search);
        temp_query = processSearch(temp_query);
        temp_query = encodeURIComponent(temp_query);
        if (temp_query !== this.state.lastQuery) {
            console.group("updated");
            fetch('http://localhost:4000/v1/search?q=' + temp_query, { crossDomain: true })
                .then(res => res.json())
                .then(results => {
                    //console.log("fetch results: ", results.rows);
                    if (temp_query.length !== 0) {
                        this.setState({ data: results.rows, lastQuery: temp_query })
                    }
                })
                .catch(err => err)
        }
    }


    highestPrice = (event) => {
        this.setState({ data: this.state.data.sort((a, b) => { return b.price - a.price }) });
    }

    lowestPrice = (event) => {
        this.setState({ data: this.state.data.sort((a, b) => { return a.price - b.price }) });
    }

    highestRatings = (event) => {
        this.setState({ data: this.state.data.sort((a, b) => { return b.ratingProduct - a.ratingProduct }) });
    }

    lowestRatings = (event) => {
        this.setState({ data: this.state.data.sort((a, b) => { return a.ratingProduct - b.ratingProduct }) });
    }

    render() {
        return (
            <>
                <div className={styles.background}>
                    <div class="container flex-column pt-5 ">
                        <div className={styles.test}>
                            <div class='row'>
                                <div class="col-md-2 col-sm-12">
                                    <div class="row ml-3">
                                        <IconContext.Provider value={{ size: "1.5em" }}>
                                            <FiFilter />
                                        </IconContext.Provider>
                                        <h4 class="ml-2">Filters</h4>
                                    </div>

                                    <hr />
                                    <div class="mb-5">
                                        <h4>By price</h4>
                                        <div id="price" className="collapse show mb-3">
                                            <div><input type="radio" className="my-2 pl-4" name="x" onClick={this.highestPrice} ></input>Highest price</div>
                                            <div><input type="radio" className="my-2 pl-4" name="x" onClick={this.lowestPrice} ></input>Lowest price</div>
                                        </div>
                                        <h4>By rating</h4>
                                        <div id="ratings" className="collapse show">
                                            <div><input type="radio" className="my-2 pl-4" name="x" onClick={this.highestRatings} ></input>Highest ratings</div>
                                            <div><input type="radio" className="my-2 pl-4" name="x" onClick={this.lowestRatings} ></input>Lowest ratings</div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-10 col-sm-12">
                                    <div class="row ml-3">
                                        <IconContext.Provider value={{ size: "1.5em" }}>
                                            <FaRegFile />
                                        </IconContext.Provider>
                                        <h4 class="ml-2">Results</h4>
                                    </div>
                                    <hr />
                                    <div className="col-md-10 m-0 mx-auto">
                                        {
                                            (this.state.data.length !== 0)?
                                        this.state.data.map((item, index) => <VerticalProductDisplay {...item} key={index} ></VerticalProductDisplay>)
                                        :
                                        <div class="container">
                                            <div class="text-center">
                                            <h3>No search results</h3>
                                            <h4> You found only this beautiful cat</h4>
                                        <img src="https://www.pinclipart.com/picdir/big/57-576568_pusheen-cat-clipart.png" class="img img-fluid col-md-6" alt="decoration"></img>
                                        <h6>P.S it's priceless</h6>
                                            </div>
                                        
                                        </div>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

