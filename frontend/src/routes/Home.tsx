import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('jwt');
    navigate('/');
  };

  return (
    <>
      {localStorage.getItem('jwt') ? (
        <div>
          <h2>Home</h2>
          <p>Welcome to the home page!</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <>
          <p>Please Login again</p>
        </>
      )}
    </>
  );
};

export default Home; 