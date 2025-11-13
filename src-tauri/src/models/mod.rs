/*
los archivos mod.rs sirven para que cuando 
el lib importe toda esa monda sepa 
cuales son los modulos
 */

pub mod user;
pub mod product;
pub mod movement;

pub use user::User;
pub use product::Product;
pub use movement::Move;