import React from 'react';
import classNames from 'classnames';
import styles from '../CSS/SearchPage.module.css';
import StarRatings from 'react-star-ratings';

import Header from './Header';
import Footer from './Footer';

function VerticalProductDisplay(props) {
    return (
        <div className="row mb-5 no-gutters">
            <div className="col-1"></div>
            <img className={`col-2 ${styles.Img}`} alt="decorative" src={props.images}></img>
            <div className={`col ${styles.Info}`}>
                <div className="pl-5 pt-3">
                    <b className="mb-2">{props.name}</b>
                    <div className="my-2">
                        <StarRatings
                            rating={props.ratingProduct}
                            starDimension="25px"
                            starRatedColor="yellow"
                            starEmptyColor="lightgray"
                        />
                    </div>
                    <div className="mb-2">${props.price}</div>
                    <div className="mb-2">Description: {props.description}</div>

                </div>
            </div>
        </div>
    )
}

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
            this.setState({data: this.state.data.sort((a,b) => {return a.price-b.price})});
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
                {/* <Header user={this.props.user} {... this.props}></Header> */}
                <div className={styles.Container}>
                    <div className="row">
                        <div className={`col-2 ${styles.Filters}`}>
                            <form className="mx-auto">
                                <div className="form-group container border border-secondary border-box rounded">
                                    <b><a href="#" data-toggle="collapse" data-target="#price">&#9660; Sort by price</a></b>
                                    <div id="price" className="collapse show">
                                        <div><input type="radio" className="my-2 pl-4" name="x" onClick={this.highestPrice} ></input>Highest price</div>
                                        <div><input type="radio" className="my-2 pl-4" name="x" onClick={this.lowestPrice} ></input>Lowest price</div>
                                    </div>
                                </div>
                                <div className="form-group container my-3 border border-secondary border-box rounded">
                                    <b><a href="#" data-toggle="collapse" data-target="#ratings">&#9660; Sort by ratings</a></b>
                                    <div id="ratings" className="collapse show">
                                        <div><input type="radio" className="my-2 pl-4" name="x" onClick={this.highestRatings} ></input>Highest ratings</div>
                                        <div><input type="radio" className="my-2 pl-4" name="x" onClick={this.lowestRatings} ></input>Lowest ratings</div>
                                    </div>
                                </div>
                            </form>
                        </div>




                        <div className="col-10 m-0 mx-auto">
                            {this.state.data.map((item, index) => <VerticalProductDisplay {...item} key={index} ></VerticalProductDisplay>)}
                        </div>
                    </div>
                </div>
                <Footer></Footer>
            </>
        )
    }
}

