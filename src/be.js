const BASE_PATH = "https://eKart-backend.snehapujari.repl.co";

export const ID_PARAM = ":id";
export const API_PRODUCTS = `${BASE_PATH}/products`;
export const API_CART = `${BASE_PATH}/cart`;
export const API_CART_SINGLE = `${API_CART}/${ID_PARAM}`;
export const API_WISHLIST = `${BASE_PATH}/wishlist`;
export const API_WISHLIST_SINGLE = `${API_WISHLIST}/${ID_PARAM}`;
