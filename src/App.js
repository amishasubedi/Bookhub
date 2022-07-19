import { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
//import { uiActions } from "./store/ui-slice";
import Notification from "./components/UI/Notification";
import { sendCartData } from "./store/cart-slice";

let isInitial = true;

function App() {
  const dispatch = useDispatch();
  const showCart = useSelector((state) => state.ui.cartIsVisible);
  const cart = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.ui.notification);

  // using action creator thunk
  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }

    dispatch(sendCartData(cart));
  }, [cart, dispatch]);

  // send the http request whenever the cart changes
  // useEffect(() => {
  //   // store data in Cart node in database
  //   const sendCartData = async () => {
  //     // dispatch(
  //     //   uiActions.showNotification({
  //     //     status: "pending",
  //     //     title: "sending",
  //     //     message: "sending cart data",
  //     //   })
  //     // );

  //     // const response = await fetch(
  //     //   "https://bookhub-ec04b-default-rtdb.firebaseio.com/cart.json",
  //     //   {
  //     //     method: "PUT", // override the existing cart
  //     //     body: JSON.stringify(cart), // convert cart to json data and send it as a part of request
  //     //   }
  //     // );

  //     // // handle errors
  //     // if (!response.ok) {
  //     //   throw new Error("Sending cart data failed");
  //     //   // dispatch(
  //     //   //   uiActions.showNotification({
  //     //   //     status: "Error",
  //     //   //     title: "Error",
  //     //   //     message: "Failed to send your order. Try again",
  //     //   //   })
  //     //   // );
  //     // }

  //   //   // dispatch a new notification
  //   //   dispatch(
  //   //     uiActions.showNotification({
  //   //       status: "success",
  //   //       title: "success",
  //   //       message: "sent cart data successfully",
  //   //     })
  //   //   );
  //   // };

  //   // prevent execution of useEffect when page loads for the first time;
  //   if (isInitial) {
  //     isInitial = false;
  //     return;
  //   }

  //   sendCartData().catch((error) => {
  //     // dispatch(
  //     //   uiActions.showNotification({
  //     //     status: "Error",
  //     //     title: "Error",
  //     //     message: "Failed to send your order. Try again",
  //     //   })
  //     // );
  //   });
  // }, [cart, dispatch]);

  return (
    <Fragment>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;
