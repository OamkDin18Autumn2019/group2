import React from "react";
import styles from "../CSS/BasketProductEntry.module.css";
export default props => {
  const data = props.data;
  // console.log(data)
 
  return (
    <>
      <tr>
        <td><img className={styles.productImageInBasket} src={data.images}/> </td>
        <td>{data.name}</td>
        <td>In stock</td>
        <td><input class="form-control" type="text" readOnly value={data.amountInTheCart} /></td>
        <td class="text-right">{data.price * data.amountInTheCart} €</td>
        <td class="text-right"><button class="btn btn-sm btn-danger">Delete</button> </td>
      </tr>
    </>
  );
};
