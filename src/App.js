
import { Routes,Route,BrowserRouter as Router } from "react-router-dom";
import AdminLogin from "./components/AdminLogin";
import Dashboard from "./components/Dashboard";
import Home from "./components/UserInterface/UserComponents/Screens/Home";
import CartComponent from "./components/UserInterface/UserComponents/Screens/CartComponent";
import ProductPageComponent from "./components/UserInterface/UserComponents/Screens/ProductPageComponent";
import MyAccount from "./components/UserInterface/UserComponents/User/MyAccountComponent";
import UserDetailsComponent from "./components/UserInterface/UserComponents/User/UserDetailsComponent";
import OtpPage from"./components/UserInterface/UserComponents/User/OtpPageComponent"
import PageComponent from "./components/UserInterface/UserComponents/Screens/PageComponent";

function App() {
  return (<div>
<Router>
  <Routes>
    
    <Route   element={<AdminLogin/>} path='admin'/>
    <Route   element={<Dashboard/>} path='/dashboard/*'/>
    <Route   element={<Home/>} path='/home'/>
    <Route   element={<CartComponent/>} path='/cart'/>
    <Route   element={<ProductPageComponent/>} path='/productpage'/>
    <Route   element={<MyAccount/>} path='/myaccount'/>
    <Route   element={<OtpPage/>} path='/otp'/>
    <Route   element={<UserDetailsComponent/>} path='/useraccount'/>
    <Route   element={<PageComponent/>} path='/Page'/>

  


    

  
  </Routes>
</Router>
   
    


  </div>
 
  );
}

export default App;
