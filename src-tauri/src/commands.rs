use crate::models::Product;
use crate::services::auth::AuthService;
use crate::errors::{AppError};
use crate::services::product_repo;
use serde::{Deserialize, Serialize};

#[derive(Deserialize)]
pub struct UserEntry {
    pub username: String,
    pub password: String,
}

#[derive(Serialize)]
pub struct LoginResponse {
    pub success: bool,
    pub message: String,
    pub username: String,
}

#[derive(Serialize)]
pub struct DefaultResponse{
    pub success: bool
}

// Cuando llamo login con el payload, llama  la funcion del auth
// si el auth dice q shi, retorno la respuesta que contiene un booleano string y el id del usuario
#[tauri::command]
pub async fn login(entry: UserEntry) -> Result<LoginResponse, String> {
    match AuthService::authenticate(&entry.username, &entry.password) {
        Ok(user) => Ok(LoginResponse {
            success: true,
            message: "Ingreso exitoso".into(),
            username: user.username,
        }),
        Err(AppError::InvalidCredentials) => Ok(LoginResponse {
            success: false,
            message: "Usuario o contraseña incorrectos".into(),
            username: "XDDDDDD".into(),
        }),
        Err(_) => Err("Error interno del servidor".into()),
    }
}

#[tauri::command]
pub async fn add_product(product: Product) -> Result<DefaultResponse, String> {
    match product_repo::insert_product(&product) {
        Ok(_product) => Ok(DefaultResponse { success: true }),
        Err(_) => Ok(DefaultResponse { success: false })
    }
}

#[tauri::command]
pub async fn get_all_products() -> Result<Vec<Product>, String> {
    match product_repo::all_products() {
        Ok(products) => Ok(products),
        Err(_) => Err("JAJa error al retornar los productos".into())
    }
}

#[tauri::command]
pub async fn get_product_by_code(code: String) -> Result<Product, String>{
    match product_repo::find_product_by_code(code) {
        Ok(Some(product)) => Ok(product),
        Ok(None) => Err("JAJA fallo el get_product_by_code".into()),
        Err(_) => Err("JAJA fallo el get_product_by_code".into())
    }
}

#[tauri::command]
pub async fn stock_out(code:String, cant: i32) -> Result<Product, String>{
    match product_repo::stock_out(code, cant) {
        Ok(Some(product)) => Ok(product),
        Ok(None) => Err("JAJA fallo el get_product_by_code".into()),
        Err(_) => Err(" JAJA fallo el stock_out".into())
    }
}
