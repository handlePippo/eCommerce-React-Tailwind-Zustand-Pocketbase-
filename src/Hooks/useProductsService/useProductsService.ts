import { useCallback, useReducer } from "react";
import {
  productsReducer,
  initialState,
} from "../../Services/Products/products.reducer";
import {
  PB_AddProduct,
  PB_DeleteProduct,
  PB_GetProducts,
  PB_UpdateProduct,
} from "../../Services/Products/products.api";
import { Product } from "@/Model/";

export default function useProductsService() {
  const [state, dispatch] = useReducer(productsReducer, initialState);

  const handleGetProducts = useCallback(async () => {
    dispatch({ type: "pending", payload: true });
    try {
      const { items } = await PB_GetProducts();
      dispatch({ type: "getProductsSuccess", payload: items });
    } catch (error) {
      dispatch({ type: "error", payload: "Prodotti non caricati" });
    }
  }, []);

  const handleDeleteProducts = useCallback(async (id: string) => {
    dispatch({ type: "pending", payload: true });
    try {
      await PB_DeleteProduct(id);
      dispatch({ type: "deleteProductsSuccess", payload: id });
    } catch (error) {
      dispatch({ type: "error", payload: "Prodotto non cancellato!" });
    }
  }, []);

  const handleAddProduct = useCallback(async (p: Partial<Product>) => {
    dispatch({ type: "pending", payload: true });
    try {
      const pRes = await PB_AddProduct(p);
      dispatch({ type: "addProductsSuccess", payload: pRes });
    } catch (error) {
      dispatch({ type: "error", payload: "Prodotto non aggiunto!" });
    }
  }, []);

  const handleUpdateProduct = useCallback(async (p: Partial<Product>) => {
    dispatch({ type: "pending", payload: true });
    try {
      const pRes = await PB_UpdateProduct(p);
      dispatch({ type: "updateProductsSuccess", payload: pRes });
    } catch (error) {
      dispatch({ type: "error", payload: "Prodotto non aggiornato!" });
    }
  }, []);

  const setActiveItem = useCallback(
    (p: Product | object) =>
      dispatch({ type: "setActiveProductSuccess", payload: p }),
    []
  );

  const resetActiveItem = useCallback(
    () => dispatch({ type: "resetActiveProductSuccess", payload: null }),
    []
  );

  return {
    state,
    actions: {
      handleGetProducts,
      handleDeleteProducts,
      handleAddProduct,
      handleUpdateProduct,
      setActiveItem,
      resetActiveItem,
    },
  };
}
