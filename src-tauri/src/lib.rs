#[cfg_attr(mobile, tauri::mobile_entry_point)]

mod models;
mod repo;
mod services;
mod errors;
mod commands;

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

pub fn run() {

    // test_product_by_code();

    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![
            greet,
            commands::login,
            commands::add_product,
            commands::get_product_by_code,
            commands::get_all_products,
            commands::stock_out
            ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

pub fn test_product_by_code(){
    let product = models::product::Product {
        code: "TP01".into(),
        name: "Juan carlos bodoque".into(),
        category: "Marioneta".into(), 
        price: 125,
        stock: 12,
        minimum: 10,
        description: "Es una marioneta muy bonita de un color rojo vivo".into()
    };
    let copy = services::product_repo::find_product_by_code("TP04".into());
    match copy {
        Ok(Some(prod)) => {
            println!("{:#?}", prod);
        },
        Ok(None) => println!("JAJAJAJA1"),
        Err(_) => println!("JAJAJAJA2")
    };
}

pub fn test_products(){
    // Prueba para ver si funciona  y se agrega un producto
    let product = models::product::Product {
        code: "TP01".into(),
        name: "Juan carlos bodoque".into(),
        category: "Marioneta".into(), 
        price: 125,
        stock: 12,
        minimum: 10,
        description: "Es una marioneta muy bonita de un color rojo vivo".into()
    };

    let product2 = models::product::Product {
        code: "TP02".into(),
        name: "Tulio triviño".into(),
        category: "Marioneta".into(), 
        price: 200,
        stock: 25,
        minimum: 1,
        description: "Es una marioneta con unos conocimientos muy amplios".into()
    };
    
    let _ = services::product_repo::insert_product(&product);
    let _ = services::product_repo::insert_product(&product2);

    let _ = services::product_repo::all_products(); // al final del metodo este hay un print pa ver si se agregaron
}