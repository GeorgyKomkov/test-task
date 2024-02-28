import { createSlice } from '@reduxjs/toolkit';



const initialState = {
    ids: [],
    filterIdsPrices: [],
    filterIdsProducts: [],
    filterIdsBrands: [],
};

const idsSlice = createSlice({
    name: 'ids',
    initialState,
    reducers: {
        addIds(state, { payload }) {
            state.ids = [...payload]
        },
        addFilterIdsPrices(state, { payload }) {
            state.filterIdsPrices = [...payload]
        },
        addFilterIdsProducts(state, { payload }) {
            state.filterIdsProducts = [...payload]
        },
        addFilterIdsBrands(state, { payload }) {
            state.filterIdsBrands = [...payload]
        },
        clearFilterIdsPrices( state ){
            state.filterIdsPrices = [];
        },
        clearFilterIdsProducts( state ){
            state.filterIdsProducts = [];
        },
        clearFilterIdsBrands( state ){
            state.filterIdsBrands = [];
        },
        clearFilterIdsAll(state) {
            state.filterIdsPrices = [];
            state.filterIdsProducts = [];
            state.filterIdsBrands = [];
        }
    }
});

export const { addIds, addFilterIdsPrices, addFilterIdsProducts, addFilterIdsBrands, clearFilterIdsPrices, clearFilterIdsProducts, clearFilterIdsBrands, clearFilterIdsAll } = idsSlice.actions;
export default idsSlice.reducer;