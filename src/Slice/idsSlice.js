import { createSlice } from '@reduxjs/toolkit';



const initialState = {
    ids: [],
};

const idsSlice = createSlice({
    name: 'ids',
    initialState,
    reducers: {
        addIds(state, { payload }) {
            state.ids = [...payload]
        },
    }
});

export const { addIds } = idsSlice.actions;
export default idsSlice.reducer;