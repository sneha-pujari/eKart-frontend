import faker from "faker";
faker.seed(123);
export const products = [...Array(50)].map((item) => ({
  id: faker.datatype.uuid(),
  name: faker.commerce.productName(),
  image: faker.image.image(),
  price: faker.commerce.price(),
  inStock: faker.datatype.boolean(),
  fastDelivery: faker.datatype.boolean(),
  ratings: faker.random.arrayElement([1, 2, 3, 4, 5])
}));

export const SORT_BY_PRICE = "sortByPrice";
export const INCLUDE_OUT_OF_STOCK = "includeOutOfStock";
export const ONLY_FAST_DELIVERY = "onlyFastDelivery";

export const productsReducer = (state, { type, value }) => {
  switch (type) {
    case SORT_BY_PRICE:
      return { ...state, [SORT_BY_PRICE]: value };
    case INCLUDE_OUT_OF_STOCK:
      return {
        ...state,
        [INCLUDE_OUT_OF_STOCK]: !state[INCLUDE_OUT_OF_STOCK]
      };
    case ONLY_FAST_DELIVERY:
      return { ...state, [ONLY_FAST_DELIVERY]: !state[ONLY_FAST_DELIVERY] };
    default:
      return state;
  }
};
