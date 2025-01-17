// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// // Define a Todo type
// type Todo = {
//   id: number;
//   title: string;
//   description: string;
//   status: boolean;
//   dueDate: string;
// };

// const Home = () => {
//   const navigate = useNavigate();
//   const [todos, setTodos] = useState<Todo[]>([]);
//   const [newTodo, setNewTodo] = useState<Todo>({
//     id: 0,
//     title: '',
//     description: '',
//     status: false,
//     dueDate: ''
//   });

//   // Logout and remove the token
//   const handleLogout = () => {
//     localStorage.removeItem('jwt');
//     navigate('/');
//   };

//   const fetchTodos = async () => {
//     try {
//       const response = await axios.get('http://localhost:8000/api/v1/get');
//       setTodos(Array.isArray(response.data.data) ? response.data.data : []);
//     } catch (error) {
//       console.error('Error fetching todos:', error);
//     }
//   };

//   const createTodo = async () => {
//     try {
//       await axios.post('http://localhost:8000/api/v1/post', newTodo);
//       fetchTodos();
//     } catch (error) {
//       console.error('Error creating todo:', error);
//     }
//   };

//   const deleteTodo = async (id: number) => {
//     try {
//       await axios.delete('http://localhost:8000/api/v1/delete', { data: { id } });
//       setTodos(todos.filter(todo => todo.id !== id));
//     } catch (error) {
//       console.error('Error deleting todo:', error);
//     }
//   };

//   useEffect(() => {
//     fetchTodos();
//   }, []);

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       {localStorage.getItem('jwt') ? (
//         <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
//           <h2 className="text-2xl font-bold mb-4">Home</h2>
//           <button 
//             onClick={handleLogout} 
//             className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
//           >
//             Logout
//           </button>
//           <h3 className="text-xl font-semibold mt-6">Create Todo</h3>
//           <div className="mb-4">
//             <input
//               type="text"
//               placeholder="Title"
//               value={newTodo.title}
//               onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
//               className="border border-gray-300 rounded-lg p-2 w-full mb-2"
//             />
//             <input
//               type="text"
//               placeholder="Description"
//               value={newTodo.description}
//               onChange={(e) => setNewTodo({ ...newTodo, description: e.target.value })}
//               className="border border-gray-300 rounded-lg p-2 w-full mb-2"
//             />
//             <input
//               type="date"
//               value={newTodo.dueDate}
//               onChange={(e) => setNewTodo({ ...newTodo, dueDate: e.target.value })}
//               className="border border-gray-300 rounded-lg p-2 w-full mb-4"
//             />
//             <button 
//               onClick={createTodo} 
//               className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
//             >
//               Add Todo
//             </button>
//           </div>

//           <h3 className="text-xl font-semibold mt-6">Todos</h3>
//           <ul className="space-y-2">
//             {Array.isArray(todos) && todos.length > 0 ? todos.map((todo, index) => (
//               <li key={index} className="flex items-center justify-between bg-gray-200 p-4 rounded-lg">
//                 <div className="flex items-center">
//                   <input
//                     type="checkbox"
//                     checked={todo.status}
//                     onChange={() => {
//                       const updatedTodos = todos.map((t, i) =>
//                         i === index ? { ...t, status: !t.status } : t
//                       );
//                       setTodos(updatedTodos);
//                     }}
//                     className="mr-2"
//                   />
//                   <span className={`${todo.status ? 'line-through text-gray-500' : ''}`}>
//                     {todo.title}: {todo.description}
//                   </span>
//                 </div>
//                 <button 
//                   onClick={() => deleteTodo(todo.id)} 
//                   className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition"
//                 >
//                   Delete
//                 </button>
//               </li>
//             )) : <li className="text-gray-500">No todos available</li>}
//           </ul>
//         </div>
//       ) : (
//         <p className="text-center text-gray-500">Please Login again</p>
//       )}
//     </div>
//   );
// };

// export default Home;

// Note: Make sure to store the userId in localStorage when logging in
// Example: localStorage.setItem('userId', user.id.toString());
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// Define a Todo type
type Todo = {
  id: number;
  title: string;
  description: string;
  status: boolean;
  dueDate: string;
  userId: any;
};

const Home = () => {
  const navigate = useNavigate();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState<Todo>({
    id: 0,
    title: '',
    description: '',
    status: false,
    dueDate: '',
    userId: localStorage.getItem('id')
  });

  // Logout and remove the token
  const handleLogout = () => {
    localStorage.removeItem('jwt');
    localStorage.removeItem('id');
    navigate('/');
  };

  const fetchTodos = async () => {
    try {
      const userId = localStorage.getItem('id');
      const response = await axios.get(`http://localhost:8000/api/v1/get?userId=${userId}`);
      setTodos(Array.isArray(response.data.data) ? response.data.data : []);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const createTodo = async () => {
    try {
      await axios.post('http://localhost:8000/api/v1/post', {
        ...newTodo,
        userId: localStorage.getItem('id')
      });
      fetchTodos();
      setNewTodo({
        id: 0,
        title: '',
        description: '',
        status: false,
        dueDate: '',
        userId: localStorage.getItem('id')
      });
    } catch (error) {
      console.error('Error creating todo:', error);
    }
  };

  const deleteTodo = async (id: number) => {
    try {
      const userId = localStorage.getItem('id') ;
      await axios.delete('http://localhost:8000/api/v1/delete', { data: { id, userId } });
      setTodos(todos.filter(todo => todo.id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {localStorage.getItem('jwt') ? (
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4">Home</h2>
          <button 
            onClick={handleLogout} 
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
          >
            Logout
          </button>
          <h3 className="text-xl font-semibold mt-6">Create Todo</h3>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Title"
              value={newTodo.title}
              onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
              className="border border-gray-300 rounded-lg p-2 w-full mb-2"
            />
            <input
              type="text"
              placeholder="Description"
              value={newTodo.description}
              onChange={(e) => setNewTodo({ ...newTodo, description: e.target.value })}
              className="border border-gray-300 rounded-lg p-2 w-full mb-2"
            />
            <input
              type="date"
              value={newTodo.dueDate}
              onChange={(e) => setNewTodo({ ...newTodo, dueDate: e.target.value })}
              className="border border-gray-300 rounded-lg p-2 w-full mb-4"
            />
            <button 
              onClick={createTodo} 
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
            >
              Add Todo
            </button>
          </div>

          <h3 className="text-xl font-semibold mt-6">Todos</h3>
          <ul className="space-y-2">
            {Array.isArray(todos) && todos.length > 0 ? todos.map((todo, index) => (
              <li key={index} className="flex items-center justify-between bg-gray-200 p-4 rounded-lg">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={todo.status}
                    onChange={() => {
                      const updatedTodos = todos.map((t, i) =>
                        i === index ? { ...t, status: !t.status } : t
                      );
                      setTodos(updatedTodos);
                    }}
                    className="mr-2"
                  />
                  <span className={`${todo.status ? 'line-through text-gray-500' : ''}`}>
                    {todo.title}: {todo.description}
                  </span>
                </div>
                <button 
                  onClick={() => deleteTodo(todo.id)} 
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </li>
            )) : <li className="text-gray-500">No todos available</li>}
          </ul>
        </div>
      ) : (
        <p className="text-center text-gray-500">Please Login again</p>
      )}
    </div>
  );
};

export default Home;


