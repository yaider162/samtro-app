use rusqlite::params;
use crate::models::Move;
use super::db;

pub fn add_mode(mov: &Move) -> rusqlite::Result<()> {
    let conn = db::get_connection()?;
    conn.execute("INSERT INTO movements (product_code, stock, date, type_move) VALUES (?1, ?2, ?3, '4)", params![mov.product_code, mov.stock, mov.date, mov.type_move])?;
    
    Ok(())
}