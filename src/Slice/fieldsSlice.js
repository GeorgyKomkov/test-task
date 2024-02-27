import { createSlice } from '@reduxjs/toolkit';

const initialState = {
     products: [],
     prices: [],
     brands: [],
     selectedBrand: '',
     selectedPrice: '',
     selectedProduct: '',
     filterIds: [],
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
        },
        setSeletedBrand(state, {payload}){
            state.selectedBrand = payload;
        },
        setSeletedProduct(state, {payload}){
            state.selectedProduct = payload;
        },
        setSeletedPrice(state, {payload}){
            state.selectedPrice = payload;
        },

    }
});
export const { addIProducts, addPrices,  addBrands, setSeletedBrand, setSeletedProduct, setSeletedPrice } = fieldsSlice.actions;
export default fieldsSlice.reducer;