import { configureStore} from "@reduxjs/toolkit";
import cartSlice from "./slices/cartSlice";
import addressSlice from "./slices/addressSlice";

export const store = configureStore({
    reducer: {
        cart: cartSlice,
        address: addressSlice
    }
})