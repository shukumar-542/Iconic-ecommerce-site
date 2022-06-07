import React, { useEffect, useState } from 'react';
import { getDatabaseCart } from '../../utilities/fakedb';
import fakeData from '../../fakeData/MOCK_DATA (3).json'
import ReviewItem from '../ReviewItem/ReviewItem';
import './Review.css'
const Review = () => {
      const [cart , setCart] = useState([])
     useEffect(()=>{
           const savedCart = getDatabaseCart()
           const productid = Object.keys(savedCart);
          
           const cartProduct = productid.map(id =>{
                 const product  = fakeData.find(pd =>pd.id === id)
                 product.quantity = savedCart[id]
                 return product
           })
           setCart(cartProduct)
     },[])
      return (
            <div className='item-review'>
                  {
                        cart.map(pd => <ReviewItem product ={pd}/>)
                  }
            </div>
      );
};

export default Review;