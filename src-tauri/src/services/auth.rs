use crate::{errors::{AppError, AppResult}, models::User};

pub struct AuthService;

impl AuthService {
    pub fn authenticate(user: &str, password: &str) -> AppResult<User> {
        // implementacion boba  pa ver  si funciona
        if user=="1234"  &&  password=="1234" {
            return Ok(User {
                id:1,
                username:user.to_string(),
                password: password.to_string()
            });
        }
        else {
            Err(AppError::InvalidCredentials)
        }
    }
}