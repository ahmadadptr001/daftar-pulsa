import './App.css';
import "primeicons/primeicons.css";  
import 'primereact/resources/themes/bootstrap4-dark-blue/theme.css'; 
import 'primereact/resources/primereact.min.css';

import { BrowserRouter as Router , Routes, Route } from 'react-router-dom';

import Dashboard from './components/Pages/Dashboard';
import DataUsers from './components/Pages/DataUsers';
import DataAddUsers from './components/Pages/DataAddUsers';
import Buy from "./components/Pages/Buy";
import RiwayatTransaction from './components/Pages/RIwayatTransaction';

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} /> 
          <Route path="/data/users" element={<DataUsers />} /> 
          <Route path="/data/users/add" element={<DataAddUsers />} /> 
          <Route path="/data/transaction/buy" element={<Buy />} />
          <Route path="/data/transaction/riwayat" element={<RiwayatTransaction />} />
        </Routes>
      </Router> 
    </>
  )
} 

export default App
