import { createSlice } from '@reduxjs/toolkit';

const initialState = {
     products: [],
     prices: [],
     brands: [],
     selectedFileds: {
        selectedBrand: '',
        selectedPrice: '',
        selectedProduct: '',
     }
    
};

const fieldsSlice = createSlice({
    name: 'fields',
    initialState,
    reducers: {
        addIProducts(state, { payload }) {
            state.products = ['Выбрать все', ...payload]
        },
        addPrices(state, {payload}) {
            state.prices = ['Выбрать все', ...payload]
        },
        addBrands(state, {payload}){
            state.brands = ['Выбрать все', ...payload]
        },
        setSeletedBrand(state, {payload}){
            state.selectedFileds.selectedBrand = payload;
        },
        setSeletedProduct(state, {payload}){
            state.selectedFileds.selectedProduct = payload;
        },
        setSeletedPrice(state, {payload}){
            state.selectedFileds.selectedPrice = payload;
        },
        clearSelectedFiledsAll(state){
            state.selectedFileds.selectedBrand = '';
            state.selectedFileds.selectedProduct = '';
            state.selectedFileds.selectedPrice = '';
        }
    },
    
});
export const { addIProducts, addPrices,  addBrands, setSeletedBrand, setSeletedProduct, setSeletedPrice, clearSelectedFiledsAll } = fieldsSlice.actions;
export default fieldsSlice.reducer;

