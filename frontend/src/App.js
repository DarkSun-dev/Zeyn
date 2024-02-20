import { Navigate, Route, Routes } from "react-router-dom"
import axios from "axios"
import './assets/css/App.css'
import { useEffect, useState } from "react"
import Home from "./pages/Home"
import Loger from "./pages/Loger"
import ErrorPage from "./pages/ErrorPage"
import Login from "./pages/Login"
import AddService from "./pages/AddService"
import ReportManager from "./pages/ReportManager"
import Services from "./pages/Services"
import Historico from "./pages/Historico"
import AddClient from "./pages/AddClient"
import Client from "./pages/Cliente"

const App = () => {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState({})
  const [isLoggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
    axios.get('/api/user/me').then(res => {
      console.log(res);
      if (res.data.status === 'success') {
        if (res.data.data.data.role === 'user' || res.data.data.data.role === 'admin') {
          setUser(res.data.data.data)
          setLoggedIn(true)
          setLoading(false)
        }
      } else {
        setLoggedIn(false)
        setUser({ email: "", role: "", username: "" })
        setLoading(false)
      }
    }).catch(e => {
      setLoggedIn(false)
      setUser({ email: "", role: "", username: "" })
      setLoading(false)
    })
  }, [])

  return (
    <div className="container">
      <Routes>
        <Route path='/' element={loading ? <Loger /> : <Home user={user} isLoggedIn={isLoggedIn} />} />
        <Route path='/login' element={loading ? <Loger /> : isLoggedIn ? <Navigate replace to="/" /> : <Login />} />
        <Route path='/createService' element={loading ? <Loger /> : isLoggedIn && user.role === 'admin' ? <AddService user={user} isLoggedIn={isLoggedIn} /> : <Navigate replace to="/" />} />
        <Route path='/createClient' element={loading ? <Loger /> : isLoggedIn && user.role === 'admin' ? <AddClient user={user} isLoggedIn={isLoggedIn} /> : <Navigate replace to="/" />} />
        <Route path='/services' element={loading ? <Loger /> : isLoggedIn && user.role === 'admin' ? <Services user={user} isLoggedIn={isLoggedIn} /> : <Navigate replace to="/" />} />
        <Route path='/reportManager' element={loading ? <Loger /> : isLoggedIn && user.role === 'admin' ? <ReportManager user={user} isLoggedIn={isLoggedIn} /> : <Navigate replace to="/login" />} />
        <Route path='/clients' element={loading ? <Loger /> : isLoggedIn && user.role === 'admin' ? <Client user={user} isLoggedIn={isLoggedIn} /> : <Navigate replace to="/login" />} />
        <Route path='/historico' element={loading ? <Loger /> : isLoggedIn && user.role === 'user'? <Historico user={user} isLoggedIn={isLoggedIn} /> : <Navigate replace to="/login" />} />
        <Route path='*' element={<ErrorPage />} />
        <Route path='/loader' element={<Loger />} /> 
      </Routes>
    </div>
  )
}

export default App
