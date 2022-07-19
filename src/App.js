import { useEffect } from "react";
import { useSelector } from "react-redux";

import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";

function App() {
  const showCart = useSelector((state) => state.ui.cartIsVisible);
  const cart = useSelector((state) => state.cart);

  // send the http request whenever the cart changes
  useEffect(() => {
    // store data in Cart node in database
    fetch("https://bookhub-ec04b-default-rtdb.firebaseio.com/cart.json", {
      method: "PUT", // override the existing cart
      body: JSON.stringify(cart), // convert cart to json data and send it as a part of request
    });
  }, [cart]);

  return (
    <Layout>
      {showCart && <Cart />}
      <Products />
    </Layout>
  );
}

export default App;
