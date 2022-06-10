import React from 'react';
import { Link } from 'react-router-dom';

const Cart = (props) => {
      const cart = props.cart
      // console.log(cart);
      const productPrice = cart.reduce((total,pd)=>total + pd.price*pd.quantity,0);
      let shipping= 0;
      if(productPrice >100){
            shipping = 0;
      }
      else if(productPrice > 50){
            shipping =15;
      }
      else if(productPrice > 0){
            shipping =20
      }
      const tax = productPrice / 10;
      const total = productPrice + shipping +tax
      return (
            <div>
            <h2>Order Summery</h2>
                  <p>Items Orderd : {cart.length}</p>
                  <p>Product Price : {productPrice}</p>
                  <small>Shipping Cost :  {shipping}</small><br />
                  <small>Tax + Vat : {tax}</small>
                  <p>Total : {total}</p>
                  {
                        props.children
                  }
            </div>
      );
};

export default Cart;