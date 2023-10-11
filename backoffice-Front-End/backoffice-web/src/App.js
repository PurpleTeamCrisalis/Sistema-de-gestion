import HomePage from "./pages/HomePage";
import {LoginPage} from "./pages/LoginPage"
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import UserListComponent from "./components/ListComponents/UserListComponent";
import ServiceListComponent from "./components/ListComponents/ServiceListComponent";
import ProductListComponent from "./components/ListComponents/ProductListComponent";
import OrderListComponent from "./components/ListComponents/OrderListComponent";
import ClientListComponent from "./components/ListComponents/ClientListComponent";
import ChargeListComponent from "./components/ListComponents/ChargeListComponent";

function App() {
  return (
      <BrowserRouter> 
        <Routes>
          <Route path="/" element={<HomePage/>}></Route>
          <Route path="/login" element={<LoginPage/>}></Route>
          <Route path="/user" element={<UserListComponent/>}></Route>
          <Route path="/service" element={<ServiceListComponent/>}></Route>
          <Route path="/product" element={<ProductListComponent/>}></Route>
          <Route path="/order" element={<OrderListComponent/>}></Route>
          <Route path="/client" element={<ClientListComponent/>}></Route>
          <Route path="/charge" element={<ChargeListComponent/>}></Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
