import { create } from "zustand";
import { apolloClient } from "@/apollo";
import { GET_PRODUCT_DETAIL } from "@/graphql/queries";
import { ProductDetail } from "@/types";

interface ProductDetailStore {
  product: ProductDetail | null;
  loading: boolean;
  error: string | null;
  fetchProductDetail: (id: string) => Promise<void>;
}

export const useProductDetailStore = create<ProductDetailStore>((set) => ({
  product: null,
  loading: false,
  error: null,

  fetchProductDetail: async (id: string) => {
    set({ loading: true, error: null });

    try {
      const { data } = await apolloClient.query({
        query: GET_PRODUCT_DETAIL,
        variables: { id },
      });

      set({
        product: data.product,
        loading: false,
        error: null,
      });
    } catch (err) {
      set({
        loading: false,
        error: err instanceof Error ? err.message : "Something went wrong",
      });
    }
  },
}));
