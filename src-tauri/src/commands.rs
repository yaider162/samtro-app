use crate::services::auth::AuthService;
use crate::errors::{AppError};
use serde::{Deserialize, Serialize};

#[derive(Deserialize)]
pub struct Entry {
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
pub async fn login(payload: Entry) -> Result<LoginResponse, String> {
    match AuthService::authenticate(&payload.username, &payload.password) {
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
