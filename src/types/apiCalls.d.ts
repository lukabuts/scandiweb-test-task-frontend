export type Category = {
    id: number;
    name: string;
}

export type Product = {
    id: string;
    name: string;
    in_stock: boolean;
    gallery: string[];
    prices: Price[];
};

export type Price = {
    amount: number;
    currency: Currency;
}
export type Currency = {
    label: string;
    symbol: string;
}