import { getCookie, setCookie } from "react-use-cookie";

const { createSlice } = require("@reduxjs/toolkit");

const addressCookie = getCookie('address')

const initialStateAddress = {
    info: null,
    user: ''
}

const addressSlice = createSlice({
    name:'address',
    initialState: addressCookie ? JSON.parse(addressCookie): initialStateAddress,
    reducers: {
        updateAddress(state,action){
            state.info = action.payload
            state.user = action.payload.user
            setCookie('address',JSON.stringify(state))
        }
    }
})

export const {updateAddress} = addressSlice.actions
export default addressSlice.reducer