import { Route, Routes } from 'react-router-dom'
import './App.css'
import axios from 'axios'
import Index from './components/Index'
import Layout from './Layout'
import LoginPage from './components/LoginPage'
import RegisterPage from './components/RegisterPage'
import { UserContextProvider } from './userContext'
import Posts from './components/Posts'


axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL
axios.defaults.withCredentials = true

function App() {

  return (
    <>
      <UserContextProvider >
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Index />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<RegisterPage />} />
            <Route path='/posts' element={<Posts />} />
          </Route>
        </Routes>
      </UserContextProvider>
    </>
  )
}

export default App
