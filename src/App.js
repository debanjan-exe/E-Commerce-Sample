import React, { useState, useEffect } from 'react'
import './App.css';
// import Navbar from './components/Navbar/Navbar';
// import Products from "./components/Products/Products"

import { Products, Navbar , Cart} from "./components"
import { commerce } from "./lib/commerce"
import { Switch, Route } from "react-router-dom"


function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});

  const fetchProducts = async() => {
    const { data } = await commerce.products.list();

    setProducts(data);
  }

  const fetchCart = async() => {
    setCart(await commerce.cart.retrieve());
  };

  const handleAddToCart = async(productId, quantity) => {
    const item = await commerce.cart.add(productId, quantity);

    setCart(item.cart);
  }

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  // console.log(cart);
  // console.log(cart.line_items.length);

  return (
    <div>
        <Navbar totalItems={cart.total_items}/>
        <Switch>

          <Route exact path="/">
            <Products products={products} onAddToCart={handleAddToCart}/>
          </Route>

          <Route exact path="/cart">
            <Cart cart={cart}/>
          </Route>

        </Switch>
    </div>
  );
}

export default App;
