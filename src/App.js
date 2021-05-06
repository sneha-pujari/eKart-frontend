import { useState } from "react";
import { Cart } from "./Cart";
import { Products } from "./Products";
import "./styles.css";
import { Wishlist } from "./Wishlist";
import { Home } from "./home";
import { NavigationBar } from "./components/navbar";

export default function App() {
  const [route, setRoute] = useState("home");
  return (
    <div className="App mt-1">
      <NavigationBar setRoute={setRoute} />
      {/* <button
        onClick={() => {
          setRoute("home");
        }}
      >
        Home
      </button>
      <button 
        className={route === "products" ? "hide btn bg-primary" : "btn bg-secondary"}
        onClick={() => {
          setRoute("products");
        }}
      >
        Products
      </button>
      <button
        className={
          route === "cart" ? "btn bg-primary ml-1" : "btn bg-secondary ml-1"
        }
        onClick={() => {
          setRoute("cart");
        }}
      >
        Cart
      </button>
      <button
        className={
          route === "wishlist" ? "btn bg-primary ml-1" : "btn bg-secondary ml-1"
        }
        onClick={() => {
          setRoute("wishlist");
        }}
      >
        Wishlist
      </button> */}
      {route === "cart" && <Cart />}
      {route === "products" && <Products setRoute={setRoute} />}
      {route === "wishlist" && <Wishlist setRoute={setRoute} />}
      {route === "home" && <Home setRoute={setRoute} />}
    </div>
  );
}
