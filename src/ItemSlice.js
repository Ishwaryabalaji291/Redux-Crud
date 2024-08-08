// src/store/itemSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'https://jsonplaceholder.typicode.com/posts'; // Example public API

// Async thunks for CRUD operations
export const fetchItems = createAsyncThunk('items/fetchItems', async () => {
    const response = await axios.get(API_URL);
    return response.data;
});

export const addItem = createAsyncThunk('items/addItem', async (item) => {
    const response = await axios.post(API_URL, item);
    return response.data;
});

export const updateItem = createAsyncThunk('items/updateItem', async (item) => {
    const response = await axios.put(`${API_URL}/${item.id}`, item);
    return response.data;
});

export const deleteItem = createAsyncThunk('items/deleteItem', async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    return id;
});

const itemSlice = createSlice({
    name: 'items',
    initialState: {
        items: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchItems.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchItems.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(fetchItems.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(addItem.fulfilled, (state, action) => {
                state.items.push(action.payload);
            })
            .addCase(updateItem.fulfilled, (state, action) => {
                const index = state.items.findIndex((item) => item.id === action.payload.id);
                state.items[index] = action.payload;
            })
            .addCase(deleteItem.fulfilled, (state, action) => {
                state.items = state.items.filter((item) => item.id !== action.payload);
            });
    },
});

export default itemSlice.reducer;
