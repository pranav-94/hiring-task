import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

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
  const [filterDate, setFilterDate] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

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

  const sortTodos = () => {
    const sortedTodos = [...todos].sort((a, b) => {
      const dateA = new Date(a.dueDate).getTime();
      const dateB = new Date(b.dueDate).getTime();
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    });
    setTodos(sortedTodos);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-3xl font-bold">Todo List</CardTitle>
        <Button className=' w-[180px] md:ml-[680px]' variant="default" onClick={handleLogout}>Logout</Button>
      </CardHeader>
      <CardContent>
        {localStorage.getItem('jwt') ? (
          <>
            <div className="space-y-4 mb-8">
              <h3 className="text-xl font-semibold">Create Todo</h3>
              <div className="space-y-2">
                <Input
                  type="text"
                  placeholder="Title"
                  value={newTodo.title}
                  onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
                />
                <Input
                  type="text"
                  placeholder="Description"
                  value={newTodo.description}
                  onChange={(e) => setNewTodo({ ...newTodo, description: e.target.value })}
                />
                <Input
                  type="date"
                  value={newTodo.dueDate}
                  onChange={(e) => setNewTodo({ ...newTodo, dueDate: e.target.value })}
                />
                <Button onClick={createTodo}>Add Todo</Button>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-2">Sort Todos by Due Date</h3>
              <Button onClick={sortTodos} variant="outline">
                Sort {sortOrder === 'asc' ? 'Ascending' : 'Descending'}
              </Button>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">Todos</h3>
              <ul className="space-y-4">
                {Array.isArray(todos) && todos.length > 0 ? todos
                  .filter(todo => !filterDate || todo.dueDate === filterDate)
                  .map((todo, index) => (
                    <li key={index} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <Checkbox
                          checked={todo.status}
                          onCheckedChange={() => {
                            const updatedTodos = todos.map((t, i) =>
                              i === index ? { ...t, status: !t.status } : t
                            );
                            setTodos(updatedTodos);
                          }}
                        />
                        <div>
                          <Label className={`font-medium ${todo.status ? 'line-through text-muted-foreground' : ''}`}>
                            {todo.title}
                          </Label>
                          <p className="text-sm text-muted-foreground">{todo.description}</p>
                          <p className="text-xs text-muted-foreground">Due: {todo.dueDate}</p>
                        </div>
                      </div>
                      <Button variant="outline" onClick={() => deleteTodo(todo.id)}>Delete</Button>
                    </li>
                  )) : <li className="text-muted-foreground">No todos available</li>}
              </ul>
            </div>
          </>
        ) : (
          <p className="text-center text-muted-foreground">Please Login again</p>
        )}
      </CardContent>
    </Card>
  );
};

export default Home;

