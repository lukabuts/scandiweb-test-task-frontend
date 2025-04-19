import { SelectedProductAttribute } from "@/pages/ProductDetailPage/types";
import { Attribute, Product } from "@/types";

export const generateDefaultCartProductId = (product: Product): string => {
  let productId = product.id;
  console.log(product)
  product.attributes.forEach((attribute) => {
    productId += "-" + attribute.id + "-" + attribute.items[0].id;
  });
  return productId;
};

export const addDefaultAttribute = (attributes: Attribute[]) => {
  return attributes.map(attribute => ({
    ...attribute,
    items: attribute.items.map((item, index) => ({
      ...item,
      selected: index === 0
    }))
  }));
};

export const addSelectedAttribute = (product: Product, selectedAttributes: SelectedProductAttribute[]) => {
  return product.attributes.map(
    (attribute: CartAttribute) => {
      const selectedAttr = selectedAttributes.find(
        (sa) => sa.attribute_id === attribute.id
      );

      return {
        ...attribute,
        items: attribute.items.map((item) => ({
          ...item,
          selected: item.id === selectedAttr?.item_id,
        })),
      };
    }
  );
};

export const generateCartProductId = (product: Product, selectedAttributes: SelectedProductAttribute[]) => {
  let cartProductId = product.id;
  selectedAttributes.forEach((attribute) => {
    cartProductId += `-${attribute.attribute_id}-${attribute.item_id}`;
  });
  return cartProductId;
}