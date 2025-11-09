/*
los archivos mod.rs sirven para que cuando 
el lib importe toda esa monda sepa 
cuales son los modulos
 */

pub mod user;
pub mod product;
pub mod stock;

pub use user::User;