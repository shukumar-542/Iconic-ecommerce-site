import React from 'react';
import { Link } from 'react-router-dom';
import './Product.css'

const Products = (props) => {
      // console.log(props);
      const{name,price, img,id} = props.product
      return (
        <div className='products'>
            <div className='img'>
              <img src={img} alt="" />
            </div>              
          <div className='products-name'>
            <h4><Link to={`/product/${id}`}>{name}</Link></h4>
            <h3>Price :{price}</h3>
            {props.addToCart && <button className='Add-btn' onClick={()=>{props.handleAddToCart(props.product)}}>Add To Cart</button>}
          </div>
        </div>
  
      );
};

export default Products;