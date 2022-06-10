import './App.css';
import Header from './components/Header/Header';
import Shop from './components/Shop/Shop';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import NotFound from './components/NotFound/NotFound';
import Review from './components/Review/Review';
import Inventory from './components/Inventory/Inventory';
import ProductDetails from './components/ProductDetails/ProductDetails';
import Login from './components/Login/Login';
import Shipment from './components/Shipment/Shipment';
import { createContext, useState } from 'react';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
export const userContext = createContext()

function App() {
  const [loggedInUser, setloggedInUser] = useState({})
  return (
    <userContext.Provider value={[loggedInUser, setloggedInUser]}>
    
      <p>emai: {loggedInUser.email}</p>
    <BrowserRouter>
    <Header/>

      <Routes>
        <Route path='/shop' element={<Shop/>}/>
        <Route exact path='/' element={<Shop/>}/>
        <Route path='/review' element={<Review/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route element={<PrivateRoute/>}>
        <Route path='/shipment' element={<Shipment/>}/>
        <Route path='/inventory' element={<Inventory/>}/>
        </Route>
        <Route path='/product/:id' element={<ProductDetails/>}/>
        <Route path='*' element={<NotFound/>}/>
      </Routes>
    </BrowserRouter>
    </userContext.Provider>
  );
}

export default App;
