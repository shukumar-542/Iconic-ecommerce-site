import React, { useEffect, useState } from 'react';
import Products from '../Products/Products';
import fakeData from '../../fakeData/MOCK_DATA (3).json'
import './Shop.css'
import Cart from '../Cart/Cart'
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/fakedb';
import { Link } from 'react-router-dom';

const Shop = () => {
      const data = fakeData;
      const [products, setProducts] = useState(data);
      const [cart, setCart] = useState([])


      useEffect(()=>{
            const savedCart = getDatabaseCart()
            const productId = Object.keys(savedCart)
            const productDetails = productId.map(key =>{
                  const product = fakeData.find(pd => pd.id  === key)
                  product.quantity = savedCart[key]
                  return product;
            })
      setCart(productDetails);

      },[])

      const handleAddToCart =(products)=>{
            // console.log(products);

            const sameProduct = cart.find(pd => pd.id === products.id);
            let count =1 
            let newCart;
            if(sameProduct){
                  count = sameProduct.quantity +1
                  sameProduct.quantity = count
                  const others = cart.filter(pd => pd.id !== products.id)
                  newCart=[...others,sameProduct]
            }
            else{
                  products.quantity =1
                  newCart=[...cart,products]
            }

            setCart(newCart);
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
                  <Cart cart={cart}>
                  <Link to={'/review'}><button className='Add-btn'>Review Order</button></Link>
                  </Cart>
            </div>


            </div>
      );
};

export default Shop;