import React, { useEffect } from "react";

import { Navigate, Route, Routes } from "react-router-dom";

import HomePage from "../pages/HomePage";
import { LoginPage } from "../pages/LoginPage";
import UserListComponent from "../components/ListComponents/UserListComponent";
import ServiceListComponent from "../components/ListComponents/ServiceListComponent";
import ProductListComponent from "../components/ListComponents/ProductListComponent";
import OrderListComponent from "../components/ListComponents/OrderListComponent";
import ClientListComponent from "../components/ListComponents/ClientListComponent";
import ChargeListComponent from "../components/ListComponents/ChargeListComponent";
import NewChargeComponent from "../components/NewElementComponents/NewChargeComponent";
import EditChargeComponent from "../components/EditElementComponents/EditChargeComponent";
import NewUserComponent from "../components/NewElementComponents/NewUserComponent";
import EditUserComponent from "../components/EditElementComponents/EditUserComponent";
import {NewOrderComponent} from "../components/NewElementComponents/NewOrderComponent";
import NewClientComponent from "../components/NewElementComponents/NewClientComponent";
import EditClientComponent from "../components/EditElementComponents/EditClientComponent"
import { useAuthStore } from "../hooks";
import EditClientCompanyComponent from "../components/EditElementComponents/EditClientCompanyComponent";
import { getLastView } from "../helpers";
import NewClientCompanyComponent from "../components/NewElementComponents/NewClientCompanyComponent";
import NewProductComponent from "../components/NewElementComponents/NewProductComponent";
import EditProductComponent from "../components/EditElementComponents/EditProductComponent"
import NewServiceComponent from "../components/NewElementComponents/NewServiceComponent";
import EditServiceComponent from "../components/EditElementComponents/EditServiceComponent"

export const AppRouter = () => {
  const { status, checkAuthToken } = useAuthStore();


  useEffect(() => {
    checkAuthToken();
  }, []);

  /* const { pathname } = useLocation();
   const navigate = useNavigate();
 
   useEffect(() => {
     checkAuthToken();
     if (status === "authenticated") navigate(localStorage.getItem("lastView"));
   }, []);
 
   useEffect(() => {
     if (pathname !== "/login") {
       localStorage.setItem("lastView", getLastView(pathname));
     }
   }, [pathname]);*/


  return (
    <Routes>
      {status === "authenticated" ? (
        <>
          <Route path="/" element={<HomePage />}/>
          <Route path="/user" element={<UserListComponent />}></Route>
          <Route path="/user/newUser" element={<NewUserComponent />}></Route>
          <Route path="/user/editUser" element={<EditUserComponent />}></Route>
          <Route path="/service" element={<ServiceListComponent />}></Route>
          <Route path="/service/newService" element={<NewServiceComponent />}></Route>
          <Route path="/service/editService" element={<EditServiceComponent />}></Route>
          <Route path="/product" element={<ProductListComponent />}></Route>
          <Route path="/product/newProduct" element={<NewProductComponent />}></Route>
          <Route path="/product/editProduct" element={<EditProductComponent />}></Route>
          <Route path="/charge" element={<ChargeListComponent />}></Route>
          <Route path="/charge/newCharge" element={<NewChargeComponent />}></Route>
          <Route path="/charge/editCharge" element={<EditChargeComponent />}></Route>
          <Route path="/client" element={<ClientListComponent />}></Route>
          <Route path="/client/newClient" element={<NewClientComponent />}></Route>
          <Route path="/client/newCompanyClient" element={<NewClientCompanyComponent />}></Route>
          <Route path="/client/editClient" element={<EditClientComponent />}></Route>
          <Route path="/client/editClientCompany" element={<EditClientCompanyComponent />}></Route>
          <Route path="/order" element={<OrderListComponent />}></Route>
          <Route path="/order/newOrder" element={<NewOrderComponent />}></Route>
          <Route path="/*" element={<Navigate to="/" />}/>
        </>
      ) : (
        <>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/*" element={<Navigate to="/login" />} />
        </>
      )}
    </Routes>
  );
};
