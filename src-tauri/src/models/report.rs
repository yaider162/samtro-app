use serde::{Serialize};

#[derive(Serialize)]
pub struct Report {
    pub message: String,
    pub date: String,
    pub _type: String,
}