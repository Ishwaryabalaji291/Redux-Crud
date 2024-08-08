// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import itemReducer from './ItemSlice.js';

const store = configureStore({
    reducer: {
        items: itemReducer,
    },
});

export default store;
