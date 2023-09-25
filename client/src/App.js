import "./App.css";
import { Route, Routes } from "react-router-dom";
import { NavBar } from "./components";
import {
  AdminOrders,
  Cart,
  Checkout,
  Home,
  Login,
  ProductDetailPage,
  Signup,
  Wishlist,
} from "./pages";
import AdminPanel from "./pages/AdminPanel";

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
        <Route path="wishlist" element={<Wishlist />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="adminOrders" element={<AdminOrders />} />
      </Routes>
    </div>
  );
}

export default App;
