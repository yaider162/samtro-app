use crate::models::Product;
use crate::models::Move;
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
pub async fn add_product(product: Product) -> Result<String, String> {
    match product_repo::insert_product(&product) {
        Ok(_product) => Ok("Producto añadido a la base de datos".into()),
        Err(e) => Ok(e.to_string())
    }
}

#[tauri::command]
pub async fn get_all_products() -> Result<Vec<Product>, String> {
    match product_repo::all_products() {
        Ok(products) => Ok(products),
        Err(e) => Err(e.to_string())
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

#[tauri::command]
pub async fn stock_in(code:String, cant: i32) -> Result<Product, String>{
    match product_repo::stock_in(code, cant) {
        Ok(Some(product)) => Ok(product),
        Ok(None) => Err("JAJA fallo el get_product_by_code".into()),
        Err(_) => Err(" JAJA fallo el stock_in".into())
    }
}

#[tauri::command]
pub async fn get_last_10_moves() -> Result<Vec<Move>, String> {
    let moves = crate::services::movements_repo::get_last_10_moves();
    match moves {
        Ok(moves) => Ok(moves),
        Err(e) => Err(e.to_string())
    }
}

#[tauri::command]
pub async fn update_product(product: Product) -> Result<String, String> {
    match product_repo::update_product(&product) {
        Ok(_) => Ok("Producto actualizado con exito".into()),
        Err(e) => Err(e.to_string())
    }
}

#[tauri::command]
pub async fn disable_product(code: String) -> Result<String, String> {
    match product_repo::disable_product(code) {
        Ok(_) => Ok("Producto desabilitado con exito".into()),
        Err(e) => Err(e.to_string())
    }
}

#[tauri::command]
pub async fn save_report(message: String, date: String, _type: String) -> Result<String, String> {
    let report = crate::models::Report {
        message,
        date,
        _type,
    };

    match crate::services::report_repo::save_report(&report) {
        Ok(_) => Ok("Reporte guardado con exito".into()),
        Err(e) => Err(e.to_string())
    }
}

#[tauri::command]
pub async fn get_all_reports() -> Result<Vec<crate::models::Report>, String> {
    match crate::services::report_repo::get_all_reports() {
        Ok(reports) => Ok(reports),
        Err(e) => Err(e.to_string())
    }
}