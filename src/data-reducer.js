export const data = {
  cartItems: [],
  wishlist: []
};

export const ADD_CART_ITEM = "addCartItem";
export const INC_QTY = "incQty";
export const DEC_QTY = "decQty";
export const REMOVE_CART_ITEM = "removeCartItem";
export const ADD_WISHLIST_ITEM = "addWishlistItem";
export const REMOVE_WISHLIST_ITEM = "removeWishlistItem";

export const dataReducer = (state, { type, id, item }) => {
  const { cartItems, wishlist } = state;
  switch (type) {
    case INC_QTY:
      return {
        ...state,
        cartItems: cartItems.map((item) => {
          return item.id === id ? { ...item, qty: item.qty + 1 } : item;
        })
      };
    case DEC_QTY:
      return {
        ...state,
        cartItems: cartItems.map((item) => {
          return item.id === id ? { ...item, qty: item.qty - 1 } : item;
        })
      };
    case REMOVE_CART_ITEM:
      return {
        ...state,
        cartItems: cartItems.filter((item) => item.id !== id)
      };
    case ADD_CART_ITEM:
      return {
        ...state,
        cartItems: cartItems.concat(item)
      };
    case REMOVE_WISHLIST_ITEM:
      return {
        ...state,
        wishlist: wishlist.filter((item) => item.id !== id)
      };
    case ADD_WISHLIST_ITEM:
      return {
        ...state,
        wishlist: wishlist.concat(item)
      };
    default:
      return state;
  }
};
