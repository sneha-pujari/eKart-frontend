import { checkItem } from "./utils";
import { useData } from "./data-context";
import {
  ADD_CART_ITEM,
  ADD_WISHLIST_ITEM,
  REMOVE_WISHLIST_ITEM
} from "./data-reducer";
import { useProducts } from "./products-context";
import {
  INCLUDE_OUT_OF_STOCK,
  ONLY_FAST_DELIVERY,
  SORT_BY_PRICE
} from "./products-reducer";

const highToLow = "highToLow";
const lowToHigh = "lowToHigh";

const handleProducts = (state) => {
  // sorting
  const sortVal = state[SORT_BY_PRICE];
  let sortedProducts = state.products;
  if (sortVal) {
    sortedProducts = state.products.sort((a, b) =>
      sortVal === highToLow ? b.price - a.price : a.price - b.price
    );
  }
  // filter based on stock
  let filteredProducts = sortedProducts;
  if (!state[INCLUDE_OUT_OF_STOCK]) {
    filteredProducts = sortedProducts.filter((product) => product.inStock);
  }
  //filter based on dilevery
  let finalProducts = filteredProducts;
  if (state[ONLY_FAST_DELIVERY]) {
    finalProducts = filteredProducts.filter(
      (products) => products.fastDelivery
    );
  }
  return finalProducts;
};
export function Products({ setRoute }) {
  const { cartItems, wishlist, dataDispatch } = useData();
  const { productsState, productsDispatch } = useProducts();
  return (
    <>
      <h1>Products</h1>
      <div>
        Price:
        <input
          checked={productsState[SORT_BY_PRICE] === highToLow}
          type="radio"
          name={SORT_BY_PRICE}
          id={highToLow}
          onChange={() => {
            productsDispatch({
              type: SORT_BY_PRICE,
              value: highToLow
            });
          }}
        />
        <label htmlFor={highToLow}>High to Low</label>
        <input
          checked={productsState[SORT_BY_PRICE] === lowToHigh}
          style={{ marginLeft: "0.5rem" }}
          type="radio"
          name={SORT_BY_PRICE}
          id={lowToHigh}
          onChange={() => {
            productsDispatch({
              type: SORT_BY_PRICE,
              value: lowToHigh
            });
          }}
        />
        <label htmlFor={lowToHigh}>Low to High</label>
      </div>
      <div>
        <input
          type="checkbox"
          checked={productsState[INCLUDE_OUT_OF_STOCK]}
          id={INCLUDE_OUT_OF_STOCK}
          onChange={() => {
            productsDispatch({
              type: INCLUDE_OUT_OF_STOCK
            });
          }}
        />
        <label htmlFor={INCLUDE_OUT_OF_STOCK}>Include Out of Stock</label>
        <input
          style={{ marginLeft: "0.5rem" }}
          type="checkbox"
          checked={productsState[ONLY_FAST_DELIVERY]}
          id={ONLY_FAST_DELIVERY}
          onChange={() => {
            productsDispatch({
              type: ONLY_FAST_DELIVERY
            });
          }}
        />
        <label htmlFor={ONLY_FAST_DELIVERY}>Fast Delivery only</label>
      </div>
      <div className="container-card">
        {handleProducts(productsState).map(
          ({
            id,
            name,
            image,
            price,
            rating,
            productName,
            inStock,
            fastDelivery
          }) => (
            <div key={id} className="card-modal">
              <img src={image} alt={productName} />
              <button
                style={{
                  fontSize: "1.1rem",
                  padding: "0.4em",
                  color: `${checkItem(wishlist, id) ? "#319795" : "grey"}`,
                  background: "white"
                }}
                className="close-button"
                onClick={() => {
                  checkItem(wishlist, id)
                    ? dataDispatch({
                        type: REMOVE_WISHLIST_ITEM,
                        id
                      })
                    : dataDispatch({
                        type: ADD_WISHLIST_ITEM,
                        item: {
                          id,
                          name,
                          price,
                          rating,
                          inStock,
                          fastDelivery,
                          image
                        }
                      });
                }}
              >
                <i className="fa fa-heart"></i>
              </button>
              <h3>{name}</h3>
              <div>Rs. {price}</div>
              {inStock && <div> In Stock </div>}
              {!inStock && <div> Out of Stock </div>}
              {fastDelivery ? (
                <div> Fast Delivery </div>
              ) : (
                <div> 3 days minimum </div>
              )}
              <button
                className="primary-button"
                onClick={() => {
                  checkItem(cartItems, id)
                    ? setRoute("cart")
                    : dataDispatch({
                        type: ADD_CART_ITEM,
                        item: {
                          id,
                          name,
                          price,
                          inStock,
                          fastDelivery,
                          image,
                          qty: 1
                        }
                      });
                }}
              >
                {checkItem(cartItems, id) ? "Go to Cart" : "Add to cart"}
              </button>
            </div>
          )
        )}
      </div>
    </>
  );
}
