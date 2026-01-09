import { useState, useEffect } from 'react';
import axiosInstance from '../api/axiosInstance.js';
import { FaEdit, FaSave } from "react-icons/fa";
import { MdDelete, MdCancel } from "react-icons/md";
import { BiSolidError } from "react-icons/bi";

const Home = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState('');

  // Fetch todos on load
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axiosInstance.get('/todo/all');
      setTodos(response.data.todos);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const addTodo = async () => {
    if (!newTodo.trim()) return;
    try {
      const response = await axiosInstance.post('/todo/create', { title: newTodo });
      setTodos([...todos, response.data.todo]);
      setNewTodo('');
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const startEdit = (id, title) => {
    setEditingId(id);
    setEditTitle(title);
  };

  const saveEdit = async () => {
    try {
      const response = await axiosInstance.put(`/todo/update/${editingId}`, { title: editTitle });
      setTodos(todos.map(todo => todo._id === editingId ? response.data : todo));
      setEditingId(null);
      setEditTitle('');
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditTitle('');
  };

  const updateTodo = async (id, completed) => {
    try {
      const response = await axiosInstance.put(`/todo/update/${id}`, { completed: !completed });
      setTodos(todos.map(todo => todo._id === id ? response.data : todo));
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axiosInstance.delete(`/todo/delete/${id}`);
      setTodos(todos.filter(todo => todo._id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 mb-5 bg-linear-to-r from-blue-100 via-purple-100 to-white rounded-2xl shadow-2xl border border-blue-200 transition-colors duration-300">
      <h1 className="text-3xl font-extrabold mb-4 pb-2 text-transparent bg-clip-text bg-linear-to-r from-blue-500 to-purple-500">My Todos</h1>
        {/* Add Todo Form */}
        <div className="mb-6">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add a new todo"
            className="w-full px-4 py-3 border-2 border-blue-300 bg-white text-gray-900 rounded-xl mb-3 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-200"
          />
          <button
            onClick={addTodo}
            className={`w-full bg-linear-to-r from-blue-500 to-purple-500 text-white py-3 rounded-xl font-semibold shadow-lg hover:scale-105 hover:from-blue-600 hover:to-purple-600 transition-all duration-200 ${newTodo.length < 3 ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={newTodo.length < 3}
          >
            Add Todo
          </button>
        </div>

        <ul className="space-y-6">
          {todos.length === 0 && (
            <li className="text-center text-gray-400 py-10 text-lg font-medium">
              <BiSolidError className="inline-block mb-1 mr-2" size={24} /> 
              You don't have anything to do. Start by adding your todo.
            </li>
          )}
          {todos.map(todo => (
              <li key={todo._id} className={`flex items-center justify-between p-5 rounded-xl shadow-md border transition-all duration-300 
                ${todo.completed ? 'bg-green-300 border-green-300' : 'bg-linear-to-r from-blue-100 via-purple-100 to-white border-blue-100'}`}> 
              <div className="flex items-center flex-1">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => updateTodo(todo._id, todo.completed)}
                  className="mr-3"
                />
                <div className="flex-1 flex flex-col gap-2">
                  {editingId === todo._id ? (
                    <input
                      type="text"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      className="px-2 py-1 bg-white border border-gray-300 text-gray-900 rounded mb-2 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-200"
                    />
                  ) : (
                    <span
                      className={`flex-1 break-word whitespace-pre-line ${todo.completed ? 'line-through text-gray-500' : ''}`}
                      style={{ wordBreak: 'break-word' }}
                    >
                      {todo.title}
                    </span>
                  )}
                  <div
                    className={`flex flex-row space-x-2 w-full transition-all duration-300 ease-in-out overflow-hidden
                      ${editingId === todo._id ? 'opacity-100 translate-y-0 max-h-20 mt-0' : 'opacity-0 -translate-y-2 max-h-0 -mt-2 pointer-events-none'}`}
                  >
                    <button
                      onClick={saveEdit}
                      className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                      tabIndex={editingId === todo._id ? 0 : -1}
                    >
                      <FaSave />
                    </button>
                    <button
                      onClick={cancelEdit}
                      className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600"
                      tabIndex={editingId === todo._id ? 0 : -1}
                    >
                      <MdCancel />
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex space-x-2">
                {editingId !== todo._id && (
                  <>
                    <button
                      onClick={() => startEdit(todo._id, todo.title)}
                        className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => deleteTodo(todo._id)}
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

export default Home;