import { create } from "zustand";
import { apolloClient } from "@/apollo";
import { GET_PRODUCT_DETAIL } from "@/graphql";

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
