export type PageType =
  | "dashboard"
  | "products"
  | "create-product"
  | "entry"
  | "exit"
  | "reports";

export interface Product {
  code: string;
  name: string;
  category: string;
  stock: number;
  minimum: number;
  price: number;
  description: string;
}

export interface DefaultResponse {
  succes: boolean;
}

export type PopupType = "success" | "error" | "info" | "warning";
