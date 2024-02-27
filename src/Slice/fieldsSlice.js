import { createSlice } from '@reduxjs/toolkit';

const initialState = {
     products: [],
     prices: [],
     brands: [],
};

const fieldsSlice = createSlice({
    name: 'fields',
    initialState,
    reducers: {
        addIProducts(state, { payload }) {
            state.products = [...payload]
        },
        addPrices(state, {payload}) {
            state.prices = [...payload]
        },
        addBrands(state, {payload}){
            state.brands = [...payload]
        }
    }
});
export const { addIProducts, addPrices,  addBrands} = fieldsSlice.actions;
export default fieldsSlice.reducer;