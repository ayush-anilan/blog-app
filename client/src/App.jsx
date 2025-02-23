import './App.css'
import HomePage from './pages/HomePage'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import PostDetail from './pages/PostDetail'
import Login from './components/Login'
import Register from './components/Register'
import CreatePost from './components/CreatePost'
import UpdatePost from './components/UpdatePost'
import MyPosts from './components/MyPosts'
import ProtectedRoute from './components/ProtectedRoute'

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/post/:postId' element={<PostDetail />} />

          {/* Protected Routes */}
          <Route path='/create' element={<ProtectedRoute><CreatePost /></ProtectedRoute>} />
          <Route path='/:postId/update' element={<ProtectedRoute><UpdatePost /></ProtectedRoute>} />
          <Route path='/my-posts' element={<ProtectedRoute><MyPosts /></ProtectedRoute>} />
        </Routes>
      </Router>
    </>
  )
}

export default App
