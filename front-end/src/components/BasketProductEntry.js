import React from "react";
import styles from "../CSS/BasketProductEntry.module.css";


export default function BasketProductEntry (props) {
  const data = props.data;
 function deleteProduct(){
    props.deleteFromCartById(props.data.id);
 }
  return (
    <>
      <tr>
        <td><img className={styles.productImageInBasket} src={data.images}/> </td>
        <td>{data.name}</td>
        <td>In stock</td>
        <td><input class="form-control" type="text" readOnly value={data.amountInTheCart} /></td>
        <td class="text-right">{data.price * data.amountInTheCart} € (-{data.discount}%)</td>
        <td class="text-right"><button onClick={ deleteProduct }class="btn btn-sm btn-danger">Delete</button> </td>
      </tr>
    </>
  );
};
