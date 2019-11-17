import React from 'react';
//import styles from '../CSS/SearchPage.module.css';

function VerticalProductDisplay(props) {
    return (
        <div className="row my-2 no-gutters">
            <img className="col-2" src={props.img} style={{height: "100%"}}></img>
            <div className="col">
                <div>{props.name}</div>
                <div>Description: {props.description}</div>
                <div>${props.price}</div>
            </div>
        </div>
    )
}

export default function SearchPage(props) {
    const data = [
        { name: 'TV', price: 19, img: 'https://images.samsung.com/is/image/samsung/vn-premium-uhd-nu8000-ua55nu8000kxxv-dynamicblack-94847376?$PD_GALLERY_L_JPG$', description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed justo nibh, ullamcorper sit amet interdum iaculis, scelerisque ullamcorper urna." },
        { name: 'Fridge', price: 200, img: 'https://brain-images-ssl.cdn.dixons.com/9/4/10164049/l_10164049_018.jpg', description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed justo nibh, ullamcorper sit amet interdum iaculis, scelerisque ullamcorper urna." }];
    return (
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
                    {data.map(item => <VerticalProductDisplay {...item} ></VerticalProductDisplay>)}
                </div>
            </div>
        </div>
    )
}
