import { useState, useEffect } from 'react';
import axiosInstance from '../api/axiosInstance.js';
import { BiSolidError } from 'react-icons/bi';
import { FaEdit, FaSave } from "react-icons/fa";
import { MdDelete, MdCancel } from "react-icons/md";

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
    <div className="max-w-2xl mx-auto mt-10 p-6 mb-5 bg-linear-to-r from-blue-100 via-purple-100 to-white rounded-2xl shadow-2xl border border-blue-200 transition-colors duration-300">
      <h1 className="text-3xl font-extrabold mb-4 pb-2 text-transparent bg-clip-text bg-linear-to-r from-blue-500 to-purple-500">My Groceries</h1>
      {/* Add Grocery Form */}
      <div className="mb-6">
        <input
          type="text"
          value={newGrocery}
          onChange={(e) => setNewGrocery(e.target.value)}
          placeholder="Add a new grocery item"
          className="w-full px-4 py-3 border-2 border-blue-300 bg-white text-gray-900 rounded-xl mb-3 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-200"
        />
        <div className="flex items-center mb-3">
          <label className="mr-4 font-semibold">Quantity:</label>
          <button onClick={() => setNewQuantity(q => Math.max(1, q - 1))} className="px-3 py-1 bg-purple-200 text-purple-700 font-bold rounded hover:bg-purple-300 transition-all">-</button>
          <span className="mx-3 text-lg font-bold">{newQuantity}</span>
          <button onClick={() => setNewQuantity(q => q + 1)} className="px-3 py-1 bg-blue-200 text-blue-700 font-bold rounded hover:bg-blue-300 transition-all">+</button>
        </div>
        <button
          onClick={addGrocery}
          className={`w-full bg-linear-to-r from-blue-500 to-purple-500 text-white py-3 rounded-xl font-semibold shadow-lg hover:scale-105 hover:from-blue-600 hover:to-purple-600 transition-all duration-200 ${newGrocery.length < 2 ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={newGrocery.length < 2}
        >
          Add Grocery
        </button>
      </div>

      {/* Grocery List */}
      <ul className="space-y-6">
        {groceries.length === 0 && (
          <li className="text-center text-gray-400 py-10 text-lg font-medium">
            <BiSolidError className="inline-block mb-1 mr-2" size={24} />
            You don't have anything to buy. Start by adding your grocery.
          </li>
        )}
        {groceries.map(grocery => (
          <li key={grocery._id} className={`flex items-center justify-between p-5 rounded-xl shadow-md border transition-all duration-300 
            ${grocery.purchased ? 'bg-green-300 border-green-300' : 'bg-linear-to-r from-blue-50 via-purple-50 to-white border-blue-100'}`}>
            <div className="flex items-center flex-1">
              <input
                type="checkbox"
                checked={grocery.purchased}
                onChange={() => updateGrocery(grocery._id, grocery.purchased)}
                className="mr-3"
              />
              <div className="flex-1 flex flex-col gap-2">
                {editingId === grocery._id ? (
                  <div className="flex flex-col sm:flex-row gap-2 w-full">
                    <input
                      type="text"
                      value={editItem}
                      onChange={(e) => setEditItem(e.target.value)}
                      className="flex-1 px-2 py-1 bg-white border border-gray-300 text-gray-900 rounded focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-200"
                    />
                    <div className="flex items-center">
                      <button onClick={decreaseQuantity} className="px-2 py-1 bg-purple-200 text-purple-700 font-bold rounded hover:bg-purple-300 transition-all">-</button>
                      <span className="mx-2 font-bold">{editQuantity}</span>
                      <button onClick={increaseQuantity} className="px-2 py-1 bg-blue-200 text-blue-700 font-bold rounded hover:bg-blue-300 transition-all">+</button>
                    </div>
                  </div>
                ) : (
                  <span className={`flex-1 break-word whitespace-pre-line ${grocery.purchased ? 'line-through text-gray-500' : ''}`}
                    style={{ wordBreak: 'break-word' }}>
                    {grocery.item} (Qty: {grocery.quantity})
                  </span>
                )}
                <div
                  className={`flex flex-row space-x-2 w-full transition-all duration-300 ease-in-out overflow-hidden
                    ${editingId === grocery._id ? 'opacity-100 translate-y-0 max-h-20 mt-0' : 'opacity-0 -translate-y-2 max-h-0 -mt-2 pointer-events-none'}`}
                >
                  <button
                    onClick={saveEdit}
                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                    tabIndex={editingId === grocery._id ? 0 : -1}
                  >
                    <FaSave />
                  </button>
                  <button
                    onClick={cancelEdit}
                    className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600"
                    tabIndex={editingId === grocery._id ? 0 : -1}
                  >
                    <MdCancel />
                  </button>
                </div>
              </div>
            </div>
            <div className="flex space-x-2">
              {editingId !== grocery._id && (
                <>
                  <button
                    onClick={() => startEdit(grocery._id, grocery.item, grocery.quantity)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => deleteGrocery(grocery._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    <MdDelete />
                  </button>
                </>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Groceries;