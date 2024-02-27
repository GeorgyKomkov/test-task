import { createSlice } from '@reduxjs/toolkit';



const initialState = {
    ids: [],
    filterIds: []
};

const idsSlice = createSlice({
    name: 'ids',
    initialState,
    reducers: {
        addIds(state, { payload }) {
            state.ids = [...payload]
        },
        updFilterIds(state, {payload}){
            state.filterIds = [...payload]
        }
    }
});

export const { addIds, updFilterIds } = idsSlice.actions;
export default idsSlice.reducer;