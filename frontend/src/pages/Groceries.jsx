import { useState, useEffect } from 'react';
import axiosInstance from '../api/axiosInstance.js';
import Loader from '../components/loader.jsx';

const Groceries = () => {
  const [groceries, setGroceries] = useState([]);
  const [newGrocery, setNewGrocery] = useState('');
  const [newQuantity, setNewQuantity] = useState(1);
  const [editingId, setEditingId] = useState(null);
  const [editItem, setEditItem] = useState('');
  const [editQuantity, setEditQuantity] = useState(1);

  // Fetch groceries on load
  useEffect(() => {
    fetchGroceries();
  }, []);

  const fetchGroceries = async () => {
    try {
      const response = await axiosInstance.get('/grocery/all');
      setGroceries(response.data.groceries);
    } catch (error) {
      console.error('Error fetching groceries:', error);
    } finally {
      setLoading(false);
    }
  };

  const addGrocery = async () => {
    if (!newGrocery.trim()) return;
    try {
      const response = await axiosInstance.post('/grocery/create', { item: newGrocery, quantity: newQuantity });
      setGroceries([...groceries, response.data.grocery]);
      setNewGrocery('');
      setNewQuantity(1);
    } catch (error) {
      console.error('Error adding grocery:', error);
    }
  };

  const startEdit = (id, item, quantity) => {
    setEditingId(id);
    setEditItem(item);
    setEditQuantity(quantity);
  };

  const saveEdit = async () => {
    try {
      const response = await axiosInstance.put(`/grocery/update/${editingId}`, { item: editItem, quantity: editQuantity });
      setGroceries(groceries.map(grocery => grocery._id === editingId ? response.data.grocery : grocery));
      setEditingId(null);
      setEditItem('');
      setEditQuantity(1);
    } catch (error) {
      console.error('Error updating grocery:', error);
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditItem('');
    setEditQuantity(1);
  };

  const updateGrocery = async (id, purchased) => {
    try {
      const response = await axiosInstance.put(`/grocery/update/${id}`, { purchased: !purchased });
      setGroceries(groceries.map(grocery => grocery._id === id ? response.data.grocery : grocery));
    } catch (error) {
      console.error('Error updating grocery:', error);
    }
  };

  const deleteGrocery = async (id) => {
    try {
      await axiosInstance.delete(`/grocery/delete/${id}`);
      setGroceries(groceries.filter(grocery => grocery._id !== id));
    } catch (error) {
      console.error('Error deleting grocery:', error);
    }
  };

  const increaseQuantity = () => setEditQuantity(prev => prev + 1);
  const decreaseQuantity = () => setEditQuantity(prev => Math.max(1, prev - 1));

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6">My Groceries</h1>

      {/* Add Grocery Form */}
      <div className="mb-6">
        <input
          type="text"
          value={newGrocery}
          onChange={(e) => setNewGrocery(e.target.value)}
          placeholder="Add a new grocery item"
          className="w-full px-3 py-2 border rounded-lg mb-2"
        />
        <div className="flex items-center mb-2">
          <label className="mr-4">Quantity:</label>
          <button onClick={() => setNewQuantity(q => Math.max(1, q - 1))} className="px-2 py-1 bg-gray-300 rounded">-</button>
          <span className="mx-2">{newQuantity}</span>
          <button onClick={() => setNewQuantity(q => q + 1)} className="px-2 py-1 bg-gray-300 rounded">+</button>
        </div>
        <button
          onClick={addGrocery}
          className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600"
        >
          Add Grocery
        </button>
      </div>

      {/* Grocery List */}
      <ul className="space-y-4">
        {groceries.map(grocery => (
          <li key={grocery._id} className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center flex-1">
                <input
                  type="checkbox"
                  checked={grocery.purchased}
                  onChange={() => updateGrocery(grocery._id, grocery.purchased)}
                  className="mr-3"
                />
                {editingId === grocery._id ? (
                  <div className="flex items-center flex-1">
                    <input
                      type="text"
                      value={editItem}
                      onChange={(e) => setEditItem(e.target.value)}
                      className="flex-1 px-2 py-1 border rounded mr-2"
                    />
                    <div className="flex items-center">
                      <button onClick={decreaseQuantity} className="px-2 py-1 bg-gray-300 rounded">-</button>
                      <span className="mx-2">{editQuantity}</span>
                      <button onClick={increaseQuantity} className="px-2 py-1 bg-gray-300 rounded">+</button>
                    </div>
                  </div>
                ) : (
                  <span className={`flex-1 ${grocery.purchased ? 'line-through text-gray-500' : ''}`}>
                    {grocery.item} (Qty: {grocery.quantity})
                  </span>
                )}
              </div>
              <div className="flex space-x-2">
                {editingId === grocery._id ? (
                  <>
                    <button
                      onClick={saveEdit}
                      className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                    >
                      Save
                    </button>
                    <button
                      onClick={cancelEdit}
                      className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => startEdit(grocery._id, grocery.item, grocery.quantity)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteGrocery(grocery._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Groceries;