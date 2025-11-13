use rusqlite::{Connection, Result};
use std::path::PathBuf;

// Crea la conexion con la base de datos, y en caso de no existir la crea
pub fn get_connection() -> Result<Connection> {
    let mut path = dirs::data_dir().unwrap_or_else(|| PathBuf::from("."));
    path.push("inventory.db");

    // abre la conexion
    let conn = Connection::open(path)?;

    // Creo la tabla de usuario
    conn.execute_batch(
        "CREATE TABLE IF NOT EXISTS users ( id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT UNIQUE NOT NULL, password TEXT NOT NULL);",)?;
    
    // Creo la tabla de productos
    conn.execute_batch(
        "CREATE TABLE IF NOT EXISTS products (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            code TEXT UNIQUE NOT NULL,
            name TEXT NOT NULL,
            category TEXT,
            price INTEGER NOT NULL,
            stock INTEGER NOT NULL,
            minimum INTEGER NOT NULL,
            description TEXT,
            active BOOLEAN NOT NULL
        );",
    )?;

    // Creo la tabla movimientos
    conn.execute_batch("
        CREATE TABLE IF NOT EXISTS movements (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        product_code TEXT UNIQUE NOT NULL,
        stock INTEGER,
        date TEXT,
        type_move TEXT);")?;

    Ok(conn)
}