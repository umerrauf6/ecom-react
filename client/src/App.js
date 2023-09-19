import "./App.css";
import { Route, Routes } from "react-router-dom";
import { NavBar } from "./components";
import { Home, Login, ProductDetailPage, Signup } from "./pages";
import AdminPanel from "./pages/AdminPanel";
import Cart from "./pages/Cart";

function App() {
  return (
    <div className="App">
      <NavBar />

      <Routes path="/">
        <Route index element={<Home />} />
        <Route path="signin" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="adminPanel" element={<AdminPanel />} />
        <Route path="product/:id" element={<ProductDetailPage />} />
        <Route path="cart" element={<Cart />} />
      </Routes>
    </div>
  );
}

export default App;
