import './App.css';
import "primeicons/primeicons.css";  
import 'primereact/resources/themes/bootstrap4-dark-blue/theme.css'; 
import 'primereact/resources/primereact.min.css';
import { HashRouter as Router , Routes, Route } from 'react-router-dom';
import Dashboard from './components/Pages/Dashboard';
import DataUsers from './components/Pages/DataUsers';
import DataAddUsers from './components/Pages/DataAddUsers';

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} /> 
          <Route path="/data/users" element={<DataUsers />} /> 
          <Route path="/data/users/add" element={<DataAddUsers />} /> 
        </Routes>
      </Router> 
    </>
  )
} 

export default App
