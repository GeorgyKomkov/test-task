import { createSlice } from '@reduxjs/toolkit';
import { setSeletedBrand, setSeletedPrice, setSeletedProduct } from './fieldsSlice';

const initialState = {
    offset: 0,
    limit: 50,
    filters: {},
};

const parametersSlice = createSlice({
    name: 'parameters',
    initialState,
    reducers: {
        incrementOffset(state, { payload }) {
            state.offset +=  payload
        },
        decrementOffset (state, { payload }) {
            state.offset -=  payload
        },
        incrementLimit(state, { payload }) {
            state.limit +=  payload
        },
        decrementLimit (state, { payload }) {
            state.limit -=  payload
        },
    }, extraReducers: (builder) => {
        builder
        .addCase(setSeletedBrand, (state, action) => {
            if (action.payload !== '') {
                state.filters = { ...state.filters, brand: action.payload };
            } else {
                delete state.filters.brand;
            }
        })
        .addCase(setSeletedProduct, (state, action) => {
            if (action.payload !== '') {
                state.filters = { ...state.filters, product: action.payload };
            } else {
                delete state.filters.product;
            }
        })
        .addCase(setSeletedPrice, (state, action) => {
            if (action.payload !== '') {
                state.filters = { ...state.filters, price: action.payload };
            } else {
                delete state.filters.price;
            }
        });
    }
});

export const { incrementOffset,  decrementOffset , incrementLimit, decrementLimit } = parametersSlice.actions;
export default parametersSlice.reducer;