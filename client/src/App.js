
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandlordLoginPage from './components/auth/landlordLogin';
import RegisterUser from './components/auth/landlordRegister';
import Property from "../src/components/pages/PropertyDetailsPage";
import RequestLandlord from "./components/pages/LandlordRequestPage";
import LandlordProfile from "./components/pages/LandlordprofilePage";
import LandlordHomePage from './components/pages/LandlordHomePage';
import HomePage from './components/pages/homePage';
import LoginRegister from './components/pages/mainRegisterLogin';
import TenantHomePage from './components/pages/TenantHomePage';
import TenantLoginPage from './components/auth/tenantLogin';
import TenantRegisterUser from './components/auth/tenantRegister';
import TenantRequests from './components/pages/tenantRequests';
import TenantProfile from './components/pages/tennatProfile';
import TenantProperty from './components/pages/TennatPropertyDetails';
import PrivateRoute from './components/PrivateRoute'; // Import the PrivateRoute component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/landlordLogin" element={<LandlordLoginPage />} />
        <Route path="/tenantLogin" element={<TenantLoginPage />} />
        <Route path="/login" element={<LoginRegister />} />

        <Route path="/HomePage" element={
          <PrivateRoute>
            <LandlordHomePage />
          </PrivateRoute>
        } />
        <Route path="/tenantHome" element={
          <PrivateRoute>
            <TenantHomePage />
          </PrivateRoute>
        } />
        <Route path="/propertyDetails" element={
          <PrivateRoute>
            <Property />
          </PrivateRoute>
        } />
        <Route path="/tenantProperty" element={
          <PrivateRoute>
            <TenantProperty />
          </PrivateRoute>
        } />
        <Route path="/requestsTtoL" element={
          <PrivateRoute>
            <RequestLandlord />
          </PrivateRoute>
        } />
        <Route path="/requests" element={
          <PrivateRoute>
            <TenantRequests />
          </PrivateRoute>
        } />
        <Route path="/Lanlordprofile" element={
          <PrivateRoute>
            <LandlordProfile />
          </PrivateRoute>
        } />
        <Route path="/tenantprofile" element={
          <PrivateRoute>
            <TenantProfile />
          </PrivateRoute>
        } />
        <Route path="/Landlordsignup" element={<RegisterUser />} />
        <Route path="/tenantsignup" element={<TenantRegisterUser />} />
      </Routes>
    </Router>
  );
}

export default App;
