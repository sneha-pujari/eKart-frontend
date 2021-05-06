import { useEffect, useState } from "react";
import { useData } from "../data-context";
// import { Link } from "react-router-dom";
// import { useNavigate, NavLink } from "react-router-dom";
import { useAxios } from "../useAxios";
import { useProducts } from "../products-context";
import { API_CART, API_PRODUCTS, API_WISHLIST } from "../be";
import { SET_CART_ITEMS, SET_WISHLIST_ITEMS } from "../data-reducer";
import { SET_PRODUCTS } from "../products-reducer";

function NotificationBadge({ length }) {
  return (
    length !== 0 && <span className="badgeSmaller posBadge">{length}</span>
  );
}

function Hamburger({ setExpNavbar }) {
  return (
    <button className="hamburger" onClick={() => setExpNavbar((prev) => !prev)}>
      <i className="fa fa-bars"></i>
    </button>
  );
}

export function NavigationBar({ setRoute }) {
  const [expNavbar, setExpNavbar] = useState(false);
  const { getData: getCartData } = useAxios(API_CART);
  const { getData: getWishlistData } = useAxios(API_WISHLIST);
  const { getData: getProductsData } = useAxios(API_PRODUCTS);
  const { wishlist, cartItems, dataDispatch } = useData();
  const {
    productsState: { products },
    productsDispatch
  } = useProducts();
  useEffect(() => {
    (async () => {
      if (cartItems.length === 0) {
        const fetchedCartItems = await getCartData();
        dataDispatch({ type: SET_CART_ITEMS, fetchedCartItems });
      }
      if (wishlist.length === 0) {
        const fetchedWishlist = await getWishlistData();
        dataDispatch({ type: SET_WISHLIST_ITEMS, fetchedWishlist });
      }
      if (products.length === 0) {
        const fetchedProducts = await getProductsData();
        productsDispatch({ type: SET_PRODUCTS, products: fetchedProducts });
      }
    })();
  }, []);

  function Navigation({ expNavbar }) {
    const { cartItems, wishlist } = useData();

    return (
      <nav className={`nav ${expNavbar ? "" : "nav-hide"}`}>
        <ul className="navList">
          <div className="navItem" onClick={() => setRoute("products")}>
            Products
          </div>
          <div className="navItem" onClick={() => setRoute("wishlist")}>
            Wishlist
            <NotificationBadge length={wishlist.length} />
          </div>
          <div className="navItem" onClick={() => setRoute("cart")}>
            Cart
            <NotificationBadge length={cartItems.length} />
          </div>
        </ul>
      </nav>
    );
  }

  function Logo() {
    // const navigate = useNavigate();
    return (
      <h1
        style={{ cursor: "pointer", color: "var(--primary-color)" }}
        onClick={() => setRoute("home")}
      >
        quest
      </h1>
    );
  }

  return (
    <div className="navigation">
      <header className="header">
        <div
          className="container"
          style={{
            boxShadow: "0 3px 5px var(--dark-light-shade)",
            borderRadius: "15px",
            paddingRight: "3rem",
            paddingLeft: "3rem",
            marginBottom: "1rem"
          }}
        >
          <Hamburger setExpNavbar={setExpNavbar} />
          <Logo />
          <Navigation expNavbar={expNavbar} />
        </div>
      </header>
    </div>
  );
}
