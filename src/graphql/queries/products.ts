import { gql } from "@apollo/client";

export const GET_PRODUCTS_BY_CATEGORY = gql`
  query GetProductsByCategory($category: String!) {
    products(category_name: $category) {
      id
      name
      in_stock
      gallery
      attributes {
        id
        name
        type {
          name
        }
        items {
          id
          value
          display_value
        }
      }
      prices {
        amount
        currency {
          symbol
        }
      }
    }
  }
`;
