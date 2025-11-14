import { Product } from "./props"
import { invoke } from "@tauri-apps/api/core";
import { Move } from "./props";

export async function getAllProducts(){
    try {
        const products =await invoke<Product[]>("get_all_products",{});
        return products
    } catch (error) {
        throw error;
    }
}
export async function addProduct(product:Product){
    try {
        const response =await invoke<string>("add_product",{product});
        return response;
    } catch (error) {
        throw error;
    }
}

export async function addStock(code:string, cant:number){
    try {
        const response =await invoke<Product>("stock_in",{code,cant});
        return response;
    } catch (error) {
        throw error;
    }
}
export async function removeStock(code:string, cant:number){
    try {
        const response =await invoke<Product>("stock_out",{code,cant});
        return response;
    } catch (error) {
        throw error;
    }
}

export async function getLast10Moves(){
    try {
        const response =await invoke<Move[]>("get_last_10_moves",{});
        return response;
    } catch (error) {
        throw error;
    }
}

export async function updateProduct(product:Product){
    try {
        const response =await invoke<string>("update_product",{product});
        return response;
    } catch (error) {
        throw error;
    }
}

export async function disableProduct(productCode:string){
    try {
        const response =await invoke<string>("disable_product",{code:productCode});
        return response;
    } catch (error) {
        console.log(error);       
        throw error;
    }
}