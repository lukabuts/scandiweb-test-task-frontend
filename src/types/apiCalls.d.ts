// Primitive and reusable pieces
export type Currency = {
  label: string;
  symbol: string;
};

export interface Price {
  amount: number;
  currency: Currency;
}

export interface AttributeItem {
  id: string;
  value: string;
  display_value: string;
}

export interface Attribute {
  id: number;
  name: string;
  type: {
    name: string;
  };
  items: AttributeItem[];
}

export interface Category {
  id: number;
  name: string;
}

// Base product (for list view)
export interface Product {
  id: string;
  name: string;
  in_stock: boolean;
  gallery: string[];
  prices: Price[];
  attributes: Attribute[];
}

// Detailed product (extends Product)
export type ProductDetail = Product & {
  description: string;
  brand: {
    name: string;
  };
};
