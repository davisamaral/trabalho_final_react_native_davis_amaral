import api from "../Common/api";

const getProducts = (token: string) => api.get("/storeProducts?page=0&perPage=100&orderDirection=asc", { headers: {"Authorization" : `Bearer ${token}`} });
const getProduct = (token: string, productId: string) => api.get("/storeProducts/product/" + productId, { headers: {"Authorization" : `Bearer ${token}`} });
const getFavoriteProducts = (token: string) => api.get("/storeProducts/getFavProducts?page=0&perPage=100&orderDirection=asc", { headers: {"Authorization" : `Bearer ${token}`} });
const manageFavoriteProduct = (token: string, data: any) => api.post("/storeProducts/manageFavorite", data, { headers: {"Authorization" : `Bearer ${token}`} });
type IParamManageFavorite = { productID: string; };

export { IParamManageFavorite }
export default {
  getProducts, getProduct, getFavoriteProducts, manageFavoriteProduct
};