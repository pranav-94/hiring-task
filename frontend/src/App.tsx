import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './routes/Login';
import Signup from './routes/Signup';
import { useState } from 'react';
import Home from './routes/Home';

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <Routes>
        <Route path="/" element={<h1>Welcome to the App</h1>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
