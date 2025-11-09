use thiserror::Error;

#[derive(Debug, Error)]
pub enum AppError {
    #[error("Usuario o contraseña incorrectos")]
    InvalidCredentials,
    #[error("Error del sistema")]
    InternalError,
}
pub type AppResult<T> = Result<T, AppError>;