use crate::models::product::{Product};
use super::db;
use rusqlite::{Result, params};

// funcion para insertar producto nuevo
pub fn insert_product(product: &Product) -> Result<()> {
    // Conecto con la base de datos
    let conn = db::get_connection()?;

    // inserto en la db el producto
    conn.execute("INSERT INTO products (code, name, category, price, stock, minimum, description) VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7)",
    params![product.code, product.name, product.category, product.price, product.stock, product.minimum, product.description])?;

    Ok(())
}

// Busco producto por código
pub fn find_product_by_code(code: String) -> Result<Option<Product>>{
    // Establezco conexion con la db
    let conn = db::get_connection()?;
    // Hago la consulta de los datos
    let mut stmt = conn.prepare("SELECT code, name, category, price, stock, minimum, description FROM products WHERE code = ?1")?;
    let mut rows = stmt.query(params![code])?;

    // En caso de no estar vacio, retornar en formato de objeto
    if let Some(row) = rows.next()? {
        Ok(Some(Product{
            code: row.get(0)?,
            name: row.get(1)?,
            category: row.get(2)?,
            price: row.get(3)?,
            stock: row.get(4)?,
            minimum: row.get(5)?,
            description: row.get(6)?,
        }))
    }else{
        Ok(None)
    }
}

pub fn stock_out(code:String, cant: i32) -> Result<Option<Product>, rusqlite::Error>{
    let product_busq = find_product_by_code(code)?;

    if let Some(mut product) = product_busq {
        product.stock -= cant;
        let _ = update_product_stock(&product);
        Ok(Some(product))
    }else {
        print!("JAJAJAJJ qué?");
        Ok(None)
    }
}

pub fn update_product_stock(product: &Product) -> Result<()>{
    let conn = db::get_connection()?;

    conn.execute("UPDATE products SET stock = ?1 WHERE code = ?2",
    params![product.stock, product.code])?;

    Ok(())
}

pub fn all_products() ->Result<Vec<Product>, String> {
    let conn = db::get_connection().map_err(|e| e.to_string())?;

    let mut stmt = conn.prepare("SELECT code, name, category, price, stock, minimum, description FROM products").map_err(|e| e.to_string())?;

    let rows = stmt.query_map([], |row|{
        Ok(Product {
            code: row.get(0)?,
            name: row.get(1)?,
            category: row.get(2)?,
            price: row.get(3)?,
            stock: row.get(4)?,
            minimum: row.get(5)?,
            description: row.get(6)?,
        })
    }).map_err(|e| e.to_string())?;

    // Cambio los resultados a un vector
    let mut products = Vec::new();
    for product in rows {
        products.push(product.map_err(|e| e.to_string())?);
    }
    println!("{:#?}", products);
    Ok(products)
}