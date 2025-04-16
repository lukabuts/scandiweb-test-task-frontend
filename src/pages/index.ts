import { lazy } from "react";

export const ProductListPage = lazy(() => import("./ProductListPage"));
export const ProductDetailPage = lazy(() => import("./ProductDetailPage"));
export * from './Errors'