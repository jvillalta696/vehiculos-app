import { Route, Routes } from 'react-router-dom';
import './App.css';
import { AuthProvider } from './contexts/AuthContext';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import ProtectedRoute from './libs/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
    <Routes>
    <Route  path="/login" element={<Login/>  }/>  
    <Route path='/' element={
      <ProtectedRoute>
         <Dashboard/>
      </ProtectedRoute>     
    }/>     
  </Routes>
  </AuthProvider>
  );
}

export default App;
