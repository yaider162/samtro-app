use crate::{models::{Move, product::Product}};
use super::db;
use rusqlite::{Result, params};
use chrono::Local;
use super::movements_repo;

// funcion para insertar producto nuevo
pub fn insert_product(product: &Product) -> Result<()> {
    // Conecto con la base de datos
    let conn = db::get_connection()?;

    // inserto en la db el producto
    conn.execute("INSERT INTO products (code, name, category, price, stock, minimum, description, active) VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8)",
    params![product.code, product.name, product.category, product.price, product.stock, product.minimum, product.description, true])?;

    // Crea un movimiento y lo guarda en la db
    let mov = Move {
        product_code: product.code.clone(),
        stock: product.stock,
        date: Local::now().date_naive().to_string(),
        type_move: "Insertar producto".into()
    };
    let _ = movements_repo::add_move(&mov);
    Ok(())
}

// Busco producto por código
pub fn find_product_by_code(code: String) -> Result<Option<Product>>{
    // Establezco conexion con la db
    let conn = db::get_connection()?;
    // Hago la consulta de los datos
    let mut stmt = conn.prepare("SELECT code, name, category, price, stock, minimum, description, active FROM products WHERE code = ?1")?;
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
            active: row.get(7)?,
        }))
    }else{
        Ok(None)
    }
}

// Saco stock
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

// Meto stock
pub fn stock_in(code:String, cant: i32) -> Result<Option<Product>, rusqlite::Error>{
    let product_busq = find_product_by_code(code)?;

    if let Some(mut product) = product_busq {
        product.stock += cant;
        let _ = update_product_stock(&product);
        Ok(Some(product))
    }else {
        print!("JAJAJAJJ qué?");
        Ok(None)
    }
}

// Actualizo la db con los cambios
pub fn update_product_stock(product: &Product) -> Result<()>{
    let conn = db::get_connection()?;

    conn.execute("UPDATE products SET stock = ?1 WHERE code = ?2",
    params![product.stock, product.code])?;

    Ok(())
}

// Obtengo todos los productos en array
pub fn all_products() ->Result<Vec<Product>, String> {
    let conn = db::get_connection().map_err(|e| e.to_string())?;

    let mut stmt = conn.prepare("SELECT code, name, category, price, stock, minimum, description, active FROM products").map_err(|e| e.to_string())?;

    let rows = stmt.query_map([], |row|{
        Ok(Product {
            code: row.get(0)?,
            name: row.get(1)?,
            category: row.get(2)?,
            price: row.get(3)?,
            stock: row.get(4)?,
            minimum: row.get(5)?,
            description: row.get(6)?,
            active: row.get(7)?,
        })
    }).map_err(|e| e.to_string())?;

    // Cambio los resultados a un vector
    let mut products = Vec::new();
    for row in rows {
        let product = row.map_err(|e| e.to_string())?;
        if product.active {
            products.push(product);
        }
    }
    println!("{:#?}", products);
    Ok(products)
}