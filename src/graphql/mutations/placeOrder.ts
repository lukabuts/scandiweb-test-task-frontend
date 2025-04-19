import { gql } from '@apollo/client';

export const PLACE_ORDER_MUTATION = gql`
  mutation PlaceOrder($products: [OrderProductInput!]!) {
    placeOrder(products: $products) {
      success
      message
    }
  }
`;