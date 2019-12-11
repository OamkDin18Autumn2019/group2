import React from 'react'
import OnSellProduct from './OnSellProduct';

export default function OnSellProducts(props) {

    console.log("test");

    return (
        <>
            <div>
                asdasdassdasdasd
                asdasdasd
                asdasdasd
                asda
            </div>
            {props.OnSell.map(onSell => {
                return(
                    <OnSellProduct props={onSell} />
                )
            })            }
        </>
    )
}
