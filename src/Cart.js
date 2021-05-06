import { useData } from "./data-context";
import { DEC_QTY, INC_QTY, REMOVE_CART_ITEM } from "./data-reducer";

const getAmount = (items) => {
  return items.reduce((total, { price, qty }) => total + price * qty, 0);
};
export function Cart() {
  const { cartItems, dataDispatch } = useData();
  return (
    <>
      <h1>Cart</h1>
      <div
        className="container-card"
        style={{ flexWrap: "wrap", justifyContent: "center" }}
      >
        {cartItems.map(
          ({
            id,
            name,
            image,
            price,
            productName,
            inStock,
            level,
            fastDelivery,
            qty
          }) => (
            <div key={id} className="card-modal">
              <img
                className="img"
                src={image}
                width="100%"
                height="auto"
                alt={productName}
              />
              <button
                style={{
                  fontSize: "1.1rem",
                  background: "white"
                }}
                className="close-button"
                onClick={() => {
                  dataDispatch({
                    type: REMOVE_CART_ITEM,
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
              {fastDelivery ? (
                <div> Fast Delivery </div>
              ) : (
                <div> 3 days minimum </div>
              )}
              <div>
                <button
                  style={{
                    padding: "0.3em 0.5em",
                    fontSize: "1.1rem"
                  }}
                  onClick={() => {
                    dataDispatch({ type: INC_QTY, id });
                  }}
                >
                  <i className="fa fa-plus quantity"></i>
                </button>
                <span>{qty}</span>
                <button
                  style={{
                    padding: "0.3em 0.5em",
                    fontSize: "1.1rem"
                  }}
                  onClick={() => {
                    dataDispatch({ type: DEC_QTY, id });
                  }}
                >
                  <i className="fa fa-minus quantity"></i>
                </button>
              </div>
            </div>
          )
        )}
      </div>
      <h2> Total Amount: Rs. {getAmount(cartItems)}</h2>
    </>
  );
}
