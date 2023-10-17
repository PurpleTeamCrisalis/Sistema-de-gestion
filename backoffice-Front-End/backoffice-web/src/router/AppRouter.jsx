import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import { LoginPage } from "../pages/LoginPage";
import UserListComponent from "../components/ListComponents/UserListComponent";
import ServiceListComponent from "../components/ListComponents/ServiceListComponent";
import ProductListComponent from "../components/ListComponents/ProductListComponent";
import OrderListComponent from "../components/ListComponents/OrderListComponent";
import ClientListComponent from "../components/ListComponents/ClientListComponent";
import ChargeListComponent from "../components/ListComponents/ChargeListComponent";
import NewUserComponent from "../components/NewElementComponents/NewUserComponent";
import EditUserComponent from "../components/EditElementComponents/EditUserComponent";
import { useAuthStore } from "../hooks";

export const AppRouter = () => {
  const { status } = useAuthStore();

  return (
    <Routes>
      {status === "authenticated" ? (
        <>
          <Route path="/" element={<HomePage />} />
          <Route path="/*" element={<Navigate to="/" />} />
          <Route path="/user" element={<UserListComponent />}></Route>
          <Route path="/service" element={<ServiceListComponent />}></Route>
          <Route path="/product" element={<ProductListComponent />}></Route>
          <Route path="/order" element={<OrderListComponent />}></Route>
          <Route path="/client" element={<ClientListComponent />}></Route>
          <Route path="/charge" element={<ChargeListComponent />}></Route>
          <Route path="/user/newUser" element={<NewUserComponent />}></Route>
          <Route path="/user/editUser" element={<EditUserComponent />}></Route>
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
