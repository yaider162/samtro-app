use rusqlite::params;
use crate::models::Move;
use super::db;

pub fn add_move(mov: &Move) -> rusqlite::Result<()> {
    let conn = db::get_connection()?;
    conn.execute("INSERT INTO movements (product_code, stock, date, type_move) VALUES (?1, ?2, ?3, '4)", params![mov.product_code, mov.stock, mov.date, mov.type_move])?;
    
    Ok(())
}

pub fn get_last_10_moves() -> Result<Vec<Move>, rusqlite::Error> {
    let conn = db::get_connection()?;
    let mut stmt = conn.prepare("SELECT product_code, stock, date, type_move FROM movements ORDER BY date DESC LIMIT 10")?;

    let moves_iter = stmt.query_map([], |row|{
        Ok(Move {
            product_code: row.get(0)?,
            stock: row.get(1)?,
            date: row.get(2)?,
            type_move: row.get(3)?
        })
    })?;

    let mut res = Vec::new();
    for m in moves_iter{
        res.push(m?);
    }
    Ok(res)
}