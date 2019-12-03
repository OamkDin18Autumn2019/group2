import React from "react";
import styles from "../CSS/BasketProductEntry.module.css";
export default props => {
  const data = props.data;
// console.log(data)
  return (
    
    <div className={styles.main}>
      <div className={styles.name}>{data.name}</div>
      <div className={styles.description}>{data.description}</div>
      <div className={styles.priceAndQuantity}>
        <div className={styles.price}>{`Price: ${data.price}`}</div>
        <div className={styles.quantity}>{`Quantity: ${data.amountInTheCart}`}</div>
      </div>
    </div>
  );
};
