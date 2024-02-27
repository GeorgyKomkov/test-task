import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    offset: 0,
};

const parametersSlice = createSlice({
    name: 'parameters',
    initialState,
    reducers: {
        increaseOffset(state, { payload }) {
            state.offset +=  payload
        },
        reduceOffset(state, { payload }) {
            state.offset -=  payload
        },
    }
});

export const { increaseOffset,  reduceOffset} = parametersSlice.actions;
export default parametersSlice.reducer;