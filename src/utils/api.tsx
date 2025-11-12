import { Product,DefaultResponse } from "./props"
import { invoke } from "@tauri-apps/api/core";

export async function getAllProducts(){
    try {
        const products =await invoke<Product[]>("get_all_products",{});
        console.log(products);
        return products
    } catch (error) {
        throw error;
    }
}
export async function addProduct(product:Product){
    try {
        const response =await invoke<DefaultResponse>("add_product",{product});
        return response;
    } catch (error) {
        throw error;
    }
}