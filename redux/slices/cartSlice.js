import { getCookie, setCookie } from "react-use-cookie";

const { createSlice } = require("@reduxjs/toolkit");

const cartCookie = getCookie("cart");

const initialStateCart = {
  items: [],
  totalAmount: 0,
  totalDiscount: 0
};

const cartSlice = createSlice({
  name: "cart",
  initialState: cartCookie ? JSON.parse(cartCookie) : initialStateCart,
  reducers: {
    add(state, action) {
      state.totalAmount =
        state.totalAmount + action.payload.amount * action.payload.price;
      const selectItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (selectItem) {
        selectItem.amount += action.payload.amount;
      } else {
        state.items = state.items.concat(action.payload);
      }
      setCookie("cart", JSON.stringify(state));
    },
    deleteProduct(state, action) {
      const selectProduct = state.items.find(
        (item) => item.id === action.payload
      );
      state.totalAmount =
        state.totalAmount - selectProduct.amount * selectProduct.price;
      if (selectProduct) {
        state.items = state.items.filter((item) => item.id !== action.payload);
      }
      setCookie("cart", JSON.stringify(state));
    },
    changeAmount(state,action){
        const notSelectProduct = state.items.filter(item => item.id !== action.payload.id)
        const summaryNotSelectPrice = notSelectProduct.reduce((sum,item)=> sum + item.price * item.amount,0)
        const selectProduct = state.items.find(item => item.id === action.payload.id)

        selectProduct.amount = action.payload.amount
        if(notSelectProduct.length >= 1){
            state.totalAmount = summaryNotSelectPrice + action.payload.amount * action.payload.price
        }else {
            state.totalAmount = action.payload.amount * action.payload.price
        }
        setCookie("cart", JSON.stringify(state));
    }
  },
});

export const { add, deleteProduct,changeAmount } = cartSlice.actions;
export default cartSlice.reducer;
