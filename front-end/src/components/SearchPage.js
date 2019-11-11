import React from 'react'

function VerticalProductDisplay(props) {
    return (
        <div className="row border border-secondary m-2 p-3">
            <img className="col-3" src={props.img}></img>
            <div className="col bg-primary">
                <div className="container">
                    <div className="row">{props.name}</div>
                    <div className="row">Description: {props.description}</div>
                    <div className="row">${props.price}</div>
                </div>
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
            <input type="text" className="form-control" placeholder="Search...."></input>
            <div className="row">
                <div className="col-2">
                    <form>
                        <div>
                            <label>Size
                                <div><input type="radio" value="option1"></input>Option 1</div>
                                <div><input type="radio" value="option2"></input>Option 2</div>
                                <div><input type="radio" value="option3"></input>Option 3</div>
                            </label>
                        </div>
                        <div>
                            <label>Price
                                <div><input type="radio" value="option1"></input>Option 1</div>
                                <div><input type="radio" value="option2"></input>Option 2</div>
                                <div><input type="radio" value="option3"></input>Option 3</div>
                            </label>
                        </div>
                    </form>

                </div>
                <div className="col">{data.map(item => <VerticalProductDisplay {...item} ></VerticalProductDisplay>)}</div>
            </div>

        </div>
    )
}
