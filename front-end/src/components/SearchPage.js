import React from 'react';
import classNames from 'classnames';
import styles from '../CSS/SearchPage.module.css';

import Header from './Header';
import Footer from './Footer';

function VerticalProductDisplay(props) {
    return (
        <div className="row my-2 no-gutters">
            <img className={`col-2 ${styles.Img}`} src={props.images} style={{ height: "100%" }}></img>
            <div className={`col ${styles.Info}`}>
                <div>{props.name}</div>
                <div>Description: {props.description}</div>
                <div>${props.price}</div>
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
    tempStr =  tempStr.replace(/\s+/g, ' ');
    tempStr = tempStr.trim();
    let temp_array = tempStr.split(" ");
    temp_array = [... new Set(temp_array)];
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
                console.log("fetch results: ", results.rows);
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
                    console.log("fetch results: ", results.rows);
                    if (temp_query.length !== 0) {
                        this.setState({ data: results.rows, lastQuery: temp_query })
                    }
                })
                .catch(err => err)
        }


    }
    render() {
        return (
            <>
                <Header user={this.props.user} {... this.props}></Header>
                <div className={styles.Container}>
                    <div className="row">
                        <div className={`col-2 ${styles.Filters}`}>
                            <form className="container my-3">
                                <div className="form-group">
                                    <label>Size</label>
                                    <div><input type="radio" value="option1"></input>Option 1</div>
                                    <div><input type="radio" value="option2"></input>Option 2</div>
                                    <div><input type="radio" value="option3"></input>Option 3</div>
                                </div>
                                <div className="form-group">
                                    <label>Price</label>
                                    <div><input type="radio" value="option1"></input>Option 1</div>
                                    <div><input type="radio" value="option2"></input>Option 2</div>
                                    <div><input type="radio" value="option3"></input>Option 3</div>
                                </div>
                            </form>
                        </div>




                        <div className="col-10 m-0 p-0">
                            {this.state.data.map((item, index) => <VerticalProductDisplay {...item} key={index} ></VerticalProductDisplay>)}
                        </div>
                    </div>
                </div>
                <Footer></Footer>
            </>
        )
    }
}

