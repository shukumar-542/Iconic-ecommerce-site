import React from 'react';
import { useParams } from 'react-router-dom';
import fakeData from '../../fakeData/MOCK_DATA (3).json'
import Products from '../Products/Products';


const ProductDetails = () => {
      const {id} = useParams();
      const data = fakeData


      const product = data.find(pd => pd.id === id)
      // console.log(product);
      return (
            <div>
                  <Products addToCart ={false} product={product}/>
            </div>
      );
};

export default ProductDetails;