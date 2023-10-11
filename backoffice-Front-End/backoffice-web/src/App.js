import HomePage from "./pages/HomePage";
import {LoginPage} from "./pages/LoginPage"
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
      <BrowserRouter> 
        <Routes>
          <Route path="/" element={<HomePage/>}></Route>
          <Route path="/login" element={<LoginPage/>}></Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
