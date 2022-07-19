import { createSlice } from "@reduxjs/toolkit";
import { uiActions } from "./ui-slice";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalQuantity: 0,
  },

  reducers: {
    // to add item in the cart
    addItemToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      state.totalQuantity++;

      // new item selected
      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          name: newItem.title,
        });

        // increased quantity of the existing item
      } else {
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.totalPrice + newItem.price;
      }
    },

    // to remove item in the cart
    removeItemFromCart(state, action) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      state.totalQuantity--;

      // remove single item
      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== id);

        // decrease the quantity if exisiting item > 1.
      } else {
        existingItem.quantity--;
      }
    },
  },
});

// create action thunk
export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        status: "pending",
        title: "sending",
        message: "sending cart data",
      })
    );

    // send request to database
    const sendRequest = async () => {
      const response = await fetch(
        "https://bookhub-ec04b-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
          body: JSON.stringify(cart),
        }
      );

      // handle errors
      if (!response.ok) {
        throw new Error("Sending cart data failed");
      }
    };

    try {
      await sendRequest();

      // dispatch a new notification
      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "success",
          message: "sent cart data successfully",
        })
      );
    } catch (error) {
      // dispatch error
      dispatch(
        uiActions.showNotification({
          status: "Error",
          title: "Error",
          message: "Failed to send your order. Try again",
        })
      );
    }
  };
};

export const cartActions = cartSlice.actions;

export default cartSlice;
