export type PageType =
  | "dashboard"
  | "products"
  | "create-product"
  | "entry"
  | "exit"
  | "reports"
  | "edit-product";

export interface Product {
  code: string;
  name: string;
  category: string;
  stock: number;
  minimum: number;
  price: number;
  description: string;
  active: boolean;
}

export interface Move{
  type_move: "entry" | "exit"|"edit"|"delete"|"create";
  product_code: string;
  date: string;
  stock: number;
  name?: string;
}

export type PopupType = "success" | "error" | "info" | "warning";
