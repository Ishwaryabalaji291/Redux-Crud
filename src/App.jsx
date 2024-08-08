// src/App.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchItems, addItem, updateItem, deleteItem } from '../../crudtask/src/ItemSlice.js';

function App() {
    const dispatch = useDispatch();
    const items = useSelector((state) => state.items.items);
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        dispatch(fetchItems());
    }, [dispatch]);

    const handleAddItem = () => {
        dispatch(addItem({ title, body }));
        setTitle('');
        setBody('');
    };

    const handleUpdateItem = (id) => {
        dispatch(updateItem({ id, title, body }));
        setTitle('');
        setBody('');
        setEditingId(null);
    };

    const handleDeleteItem = (id) => {
        dispatch(deleteItem(id));
    };

    return (
        <div className="App">
            <h1>CRUD App with React and Redux</h1>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
            />
            <input
                type="text"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="Body"
            />
            <button onClick={editingId ? () => handleUpdateItem(editingId) : handleAddItem}>
                {editingId ? 'Update' : 'Add'}
            </button>
            <ul>
                {items.map((item) => (
                    <li key={item.id}>
                        <h2>{item.title}</h2>
                        <p>{item.body}</p>
                        <button onClick={() => { setEditingId(item.id); setTitle(item.title); setBody(item.body); }}>Edit</button>
                        <button onClick={() => handleDeleteItem(item.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;
