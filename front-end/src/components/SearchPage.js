import React from 'react';
import classNames from 'classnames';
//import styles from '../CSS/SearchPage.module.css';

import Header from './Header';
import Footer from './Footer';

function VerticalProductDisplay(props) {
    return (
        <div className="row my-2 no-gutters">
            <img className="col-2" src={props.img} style={{ height: "100%" }}></img>
            <div className="col">
                <div>{props.name}</div>
                <div>Description: {props.description}</div>
                <div>${props.price}</div>
            </div>
        </div>
    )
}


export default class SearchPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                { name: 'TV', price: 19, img: 'https://images.samsung.com/is/image/samsung/vn-premium-uhd-nu8000-ua55nu8000kxxv-dynamicblack-94847376?$PD_GALLERY_L_JPG$', description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed justo nibh, ullamcorper sit amet interdum iaculis, scelerisque ullamcorper urna." },
                { name: 'Fridge', price: 200, img: 'https://brain-images-ssl.cdn.dixons.com/9/4/10164049/l_10164049_018.jpg', description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed justo nibh, ullamcorper sit amet interdum iaculis, scelerisque ullamcorper urna." }
            ]
        }
    }
    componentDidMount() {
        fetch('http://localhost:4000/v1/search?q=' + this.props.location.search.slice(3),{crossDomain:true})
            .then(res => res.json())
            .then(results=>{this.setState({data: results.rows})})
            .catch(err=>err)
    }

    goback = (event) => {
        this.props.history.goBack();
    }
    render() {
        console.log("query: ", this.props.location.search.slice(3));
        return (
            <>
                <Header user={this.props.user} {... this.props}></Header>
                <div className="container">
                    <div className="row">
                        <input type="text" className="form-control" placeholder="Search...."></input>
                    </div>

                    <div className="row">
                        <div className="col-2">
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




                        <div className="col-10">
                            {this.state.data.map((item, index) => <VerticalProductDisplay {...item} key={index} ></VerticalProductDisplay>)}
                        </div>
                    </div>
                    <button onClick={this.goback}>Back</button>
                </div>
                <Footer></Footer>
            </>
        )
    }
}

