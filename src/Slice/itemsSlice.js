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
            state.items = [...payload]
        },
        toggleLoading(state) { 
            state.loading = !state.loading;
        },
    }
});

export const { addItems, toggleLoading } = itemsSlice.actions;
export default itemsSlice.reducer;