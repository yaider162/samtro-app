use rusqlite::{params, Result};
use crate::models::User;
use super::db;

// funcion para crear un usuario nuevo
pub fn insert_user(username: &str, password: &str) -> Result<()> {
    // Establece conexion con la base de datos;
    let conn = db::get_connection()?;

    // Inserta el usuario
    conn.execute("INSERT INTO users (username, password) VALUES (?1, ?2)",
    params![username, password])?;

    Ok(())
}

// Buscar usuario por nombre (Solo lo voy a usar una vez JAJAJAJ)
pub fn find_user(username: &str) -> Result<Option<User>> {
    let conn = db::get_connection()?;
    let mut stmt = conn.prepare("SELECT id, username, password, FROM users WHERE username = ?1")?;

    let mut rows = stmt.query(params![username])?;
    if let Some(row) = rows.next()? {
        Ok(Some(User {
            id: row.get(0)?,
            username: row.get(1)?,
            password: row.get(2)?,
        }))
    } else {
        Ok(None)
    }
}