export const routes = {
  home: "/",
  productShow: (id: string) => `/products/${id}`,
  category: (name: string) => `/${name}`,
};