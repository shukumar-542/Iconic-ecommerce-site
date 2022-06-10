import React from 'react';
import './ReviewItem.css'
const ReviewItem = (props) => {
      // console.log(props)
      const {name, quantity,id,price} = props.product
      return (
            <div className='product-review'>
                  <h3>{name}</h3>
                  <p>Quantity : {quantity}</p>
                  <p>Price :{price}</p>
                  <button className='Add-btn' onClick={()=>props.handleRemoveCart(id)}>Remove</button>

                      
            </div>
      );
};

export default ReviewItem;