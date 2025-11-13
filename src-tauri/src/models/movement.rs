use serde::{Serialize};

#[derive(Serialize)]
pub struct Move {
    pub product_code: String,
    pub stock: i32,
    pub date: String,
    pub type_move: String
}