import './App.css'
import HomePage from './pages/HomePage'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import PostDetail from './pages/PostDetail'
import Login from './components/Login'
import Register from './components/Register'
import CreatePost from './components/CreatePost'
import UpdatePost from './components/UpdatePost'
import MyPosts from './components/MyPosts'

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/posts/:id' element={<PostDetail />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/create' element={<CreatePost />} />
          <Route path='/update' element={<UpdatePost />} />
          <Route path='/my-posts' element={<MyPosts />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
