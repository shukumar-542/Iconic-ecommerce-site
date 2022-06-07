import React from 'react';
import './ReviewItem.css'
const ReviewItem = (props) => {
      // console.log(props)
      const {name, quantity} = props.product
      return (
            <div className='product-review'>
                  <h3>{name}</h3>
                  <p>Quantity : {quantity}</p>
                  <button className='Add-btn'>Remove</button>
            </div>
      );
};

export default ReviewItem;