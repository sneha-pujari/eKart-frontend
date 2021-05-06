import { useData } from "./data-context";
import { ADD_CART_ITEM, REMOVE_WISHLIST_ITEM } from "./data-reducer";

export function Wishlist({ setRoute }) {
  const { wishlist, dataDispatch } = useData();
  return (
    <>
      <h1> Wishlist </h1>
      <div
        className="card-container"
        style={{ flexWrap: "wrap", justifyContent: "center" }}
      >
        {wishlist.map(
          ({
            id,
            name,
            image,
            price,
            productName,
            inStock,
            level,
            fastDelivery
          }) => (
            <div key={id} className="card-modal">
              <img src={image} width="100%" height="auto" alt={productName} />
              <button
                style={{
                  fontSize: "1.1rem",
                  background: "white"
                }}
                className="close-button"
                onClick={() => {
                  dataDispatch({
                    type: REMOVE_WISHLIST_ITEM,
                    id
                  });
                }}
              >
                <i class="fa fa-trash" style={{ color: "red" }}></i>
              </button>
              <h3> {name} </h3>
              <div>Rs. {price}</div>
              {inStock && <div> In Stock </div>}
              {!inStock && <div> Out of Stock </div>}
              <div>{level}</div>
              {fastDelivery ? (
                <div> Fast Delivery </div>
              ) : (
                <div> 3 days minimum </div>
              )}
              <button
                className="primary-button"
                onClick={() => {
                  dataDispatch({
                    type: ADD_CART_ITEM,
                    item: {
                      id,
                      name,
                      price,
                      inStock,
                      level,
                      fastDelivery,
                      image,
                      qty: 1
                    }
                  });
                  dataDispatch({
                    type: REMOVE_WISHLIST_ITEM,
                    id
                  });
                }}
              >
                Add to Cart
              </button>
            </div>
          )
        )}
      </div>
    </>
  );
}
