use crate::{errors::{AppError, AppResult}, models::User, services::user_repo};

pub struct AuthService;

impl AuthService {

    // Implementacion real
    pub fn authenticate(user: &str, password: &str) ->AppResult<User> {
        // Buscar el usuario en la base de datos
        let user = user_repo::find_user(user)
            .map_err(|_| AppError::InternalError)?
            .ok_or(AppError::InvalidCredentials)?;

        if user.password == password {
            return Ok(user)
        }
        Err(AppError::InvalidCredentials)
    }

    // pub fn authenticate(user: &str, password: &str) -> AppResult<User> {
    //     // implementacion boba  pa ver  si funciona
    //     if user=="1234"  &&  password=="1234" {
    //         return Ok(User {
    //             id:1,
    //             username:user.to_string(),
    //             password: password.to_string()
    //         });
    //     }
    //     else {
    //         Err(AppError::InvalidCredentials)
    //     }
    // }
}