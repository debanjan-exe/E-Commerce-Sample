import React, { useState, useEffect } from 'react'
import './App.css';
// import Navbar from './components/Navbar/Navbar';
// import Products from "./components/Products/Products"

import { Products, Navbar , Cart} from "./components"
import { commerce } from "./lib/commerce"


function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});

  const fetchProducts = async() => {
    const { data } = await commerce.products.list();

    setProducts(data);
  }

  const fetchCart = async() => {
    setCart( await commerce.cart.retrieve() )
  }

  const handleAddToCart = async(productId, quantity) => {
    const item = await commerce.cart.add(productId, quantity);

    setCart(item.cart);
  }

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  console.log(cart);
  // console.log(cart.line_items.length);

  return (
    <div>
        <Navbar totalItems={cart.total_items}/>
        {/* <Products products={products} onAddToCart={handleAddToCart}/> */}
        <Cart cart={cart}/>
    </div>
  );
}

export default App;
