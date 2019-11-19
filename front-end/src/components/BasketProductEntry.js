import React from "react";
import styles from "../CSS/BasketProductEntry.module.css";
import Dropdown from "react-dropdown";
export default props => {
  const data = props.data;
  const quantityDropDownOptions = [...Array(10)].map((v, i) => {
    console.log(i);
    return i;
  });
  return (
    <div className={styles.main}>
      <div className={styles.productImage}></div>
      <div className={styles.info}>
        <div className={styles.name}>{data.name}</div>
        <div className={styles.description}>{data.description}</div>
        <div className={styles.priceAndQuantity}>
          <div className={styles.price}>{`${data.price} euros`}</div>
          <div className={styles.quantity}>
            <Dropdown
              options={quantityDropDownOptions}
              value={quantityDropDownOptions[0]}
              placeholder="Quantity"
            />
          </div>
          <div className={styles.deleteButton}>{`Delete`}</div>
          <div
            className={styles.showMoreLikeThisButton}
          >{`Show more like this`}</div>
        </div>
      </div>
    </div>
  );
};
