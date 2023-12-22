import { BrowserRouter, Routes, Route } from "react-router-dom";
import HeaderComponent from "./components/HeaderComponent";
import AdminHomePages from "./pages/admin/AdminHomePages";
import RecapPages from "./pages/admin/RecapPages";
import CartPages from "./pages/CartPages";
import LoginPages from "./pages/LoginPages";
import ProtectedPage from "./components/ProtectedPage";
import DetailPages from "./pages/DetailPages";

function App() {
  return (
    <BrowserRouter>
      <HeaderComponent />
      <Routes>
        <Route path="/" element={<ProtectedPage />} />
        <Route path="/cart" element={<CartPages />}></Route>
        <Route path="/detail/:productId" element={<DetailPages />}></Route>
        <Route path="/login" element={<LoginPages />}></Route>
        <Route path="/recap" element={<RecapPages />}></Route>
        <Route path="/admin" element={<AdminHomePages />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
