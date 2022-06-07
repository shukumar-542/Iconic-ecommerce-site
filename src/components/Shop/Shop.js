import React, { useState } from 'react';
import Products from '../Products/Products';
import fakeData from '../../fakeData/MOCK_DATA (3).json'
import './Shop.css'
import Cart from '../Cart/Cart'
import { addToDatabaseCart } from '../../utilities/fakedb';

const Shop = () => {
      const data = fakeData;
      const [products, setProducts] = useState(data);
      const [cart, setCart] = useState([])
      const handleAddToCart =(products)=>{
            console.log(products);
            const newCart =[...cart,products]
            setCart(newCart)
            const sameProduct = newCart.filter(pd => pd.id === products.id)
            const count  = sameProduct.length
            addToDatabaseCart(products.id, count)
      }
      return (
            <div className='shop-container'>
        

            <div className='product-container'>
                  {
                        products.map(pd => <Products product={pd}
                        key={pd.id}
                        addToCart ={true}
                        handleAddToCart={handleAddToCart}
                        ></Products>)
                  }
                  </div>
            <div className="cart-container">
                  <Cart cart={cart}></Cart>
            </div>


            </div>
      );
};

export default Shop;