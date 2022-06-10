import React, { useEffect, useState } from 'react';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/fakedb';
import fakeData from '../../fakeData/MOCK_DATA (3).json'
import ReviewItem from '../ReviewItem/ReviewItem';
import './Review.css'
import Cart from '../Cart/Cart';
import { Link, useNavigate } from 'react-router-dom';
const Review = () => {
      const [cart , setCart] = useState([]);
      const [placedOrder, setPlaceOrder] = useState(false);
      const handleRemoveCart = (id)=>{
            const newItem = cart.filter(pd=> pd.id !== id)
            setCart(newItem)
            removeFromDatabaseCart(id)
      }
      const navigate = useNavigate()
      const procedOrder =()=>{
            navigate('/shipment')
      }

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
                  <div className='review'>
                  {
                        cart.map(pd => <ReviewItem handleRemoveCart={handleRemoveCart} key={pd.id}  product ={pd}/>)
                  }
                  {
                        placedOrder && 'Your Order has Been Placed..'
                  }
                  </div>
                 
                  <div className='cart'>
                        <Cart cart={cart}>
                              <button className='Add-btn' onClick={()=>procedOrder()}>Proceed Order</button>

                        </Cart>
                  </div>
            </div>
      );
};

export default Review;