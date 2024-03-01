import { createSlice } from '@reduxjs/toolkit';
import { setSeletedBrand, setSeletedPrice, setSeletedProduct } from './fieldsSlice';

const initialState = {
  offset: 0,
  limit: 50,
  filters: {},
  filterStatus: 'no filter',
};

const parametersSlice = createSlice({
  name: 'parameters',
  initialState,
  reducers: {
    incrementOffset(state, { payload }) {
      state.offset += payload;
    },
    decrementOffset(state, { payload }) {
      state.offset -= payload;
    },
    incrementLimit(state, { payload }) {
      state.limit += payload;
    },
    decrementLimit(state, { payload }) {
      state.limit -= payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(setSeletedBrand, (state, { payload }) => {
        if (payload !== '') {
          state.filters = { brand: payload };
          state.filterStatus = 'brand';
        } else {
          delete state.filters.brand;
          state.filterStatus = 'no filter';
        }
      })
      .addCase(setSeletedProduct, (state, { payload }) => {
        if (payload !== '') {
          state.filters = { product: payload };
          state.filterStatus = 'product';
        } else {
          delete state.filters.product;
          state.filterStatus = 'no filter';
        }
      })
      .addCase(setSeletedPrice, (state, { payload }) => {
        if (payload !== '') {
          state.filters = { price: payload };
          state.filterStatus = 'price';
        } else {
          delete state.filters.price;
          state.filterStatus = 'no filter';
        }
      });
  },
});

export const {
  incrementOffset, decrementOffset, incrementLimit, decrementLimit,
} = parametersSlice.actions;
export default parametersSlice.reducer;
