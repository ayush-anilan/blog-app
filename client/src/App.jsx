import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './pages/Home';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import PostList from './components/posts/PostList';
import PostItem from './components/posts/PostItem';
import CreatePost from './components/posts/CreatePost';
import UpdatePost from './components/posts/UpdatePost';
import CreateComment from './components/comments/CreateComment';
import Navbar from './components/Navbar';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [profilePic, setProfilePic] = useState('');

  const handleLogin = (userData) => {
    // Your login logic here
    setLoggedIn(true);
    setUserName(userData.name);
    setProfilePic(userData.profilePic);
  };

  const handleLogout = () => {
    // Your logout logic here
    setLoggedIn(false);
    setUserName('');
    setProfilePic('');
  };

  return (
    <>
      <Router>
        <div className='App'>
          <Navbar loggedIn={loggedIn} userName={userName} profilePic={profilePic} onLogout={handleLogout} />
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route exact path='/posts' element={<PostList />} />
            <Route path='/posts/:id' element={<PostItem />} />
            <Route path='/posts/:id/create' element={<CreatePost />} />
            <Route path='/posts/:id/update' element={<UpdatePost />} />
          </Routes>
        </div>
      </Router>
    </>
  )
}

export default App
