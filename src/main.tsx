import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import Layout from './components/Layout'

import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Forecast from './pages/Forecast'
import Analytics from './pages/Analytics'
import Reports from './pages/Reports'
import Cashflow from './pages/Cashflow'
import ClientPortal from './pages/ClientPortal'
import Settings from './pages/Settings'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import NotFound from './pages/NotFound'

import './styles.css'

const root = document.getElementById('root')!
createRoot(root).render(
  <BrowserRouter>
    <Routes>
      <Route element={<Layout/>}>
        <Route path="/" element={<Home/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/forecast" element={<Forecast/>}/>
        <Route path="/analytics" element={<Analytics/>}/>
        <Route path="/reports" element={<Reports/>}/>
        <Route path="/cashflow" element={<Cashflow/>}/>
        <Route path="/portal" element={<ClientPortal/>}/>
        <Route path="/settings" element={<Settings/>}/>
        <Route path="/signin" element={<SignIn/>}/>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="*" element={<NotFound/>}/>
      </Route>
    </Routes>
  </BrowserRouter>
)
