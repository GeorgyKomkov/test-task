import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  loading: false,
};

const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    addItems(state, { payload }) {
      state.items = [...payload];
    },
    setLoadingTrue(state) {
      state.loading = true;
    },
    setLoadingFalse(state) {
      state.loading = false;
    },
  },
});

export const { addItems, setLoadingTrue, setLoadingFalse } = itemsSlice.actions;
export default itemsSlice.reducer;
