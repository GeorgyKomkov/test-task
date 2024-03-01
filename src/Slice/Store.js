import { configureStore } from '@reduxjs/toolkit';
import idsReducer from './idsSlice';
import itemsReducer from './itemsSlice';
import parametersReducer from './parametersSlice';
import fieldsReducer from './fieldsSlice';

const store = configureStore({
  reducer: {
    ids: idsReducer,
    items: itemsReducer,
    parameters: parametersReducer,
    fields: fieldsReducer,
  },
});

export default store;
