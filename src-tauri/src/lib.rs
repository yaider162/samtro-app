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

    let _ = services::user_repo::insert_user("Julian Hernandez","123456");
    let _ = services::db::ensure_active_column();
    put_product();

    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![
            greet,
            commands::login,
            commands::add_product,
            commands::get_product_by_code,
            commands::get_all_products,
            commands::stock_out,
            commands::stock_in,
            commands::get_last_10_moves,
            commands::update_product,
            commands::disable_product,
            commands::save_report,
            commands::get_all_reports
            ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

// Prueba de productos por código
pub fn test_product_by_code(){
    let _ = models::product::Product {
        code: "TP01".into(),
        name: "Juan carlos bodoque".into(),
        category: "Marioneta".into(), 
        price: 125,
        stock: 12,
        minimum: 10,
        description: "Es una marioneta muy bonita de un color rojo vivo".into(),
        active: true,
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

// Prueba de productos
pub fn test_products(){
    // Prueba para ver si funciona  y se agrega un producto
    let product = models::product::Product {
        code: "TP01".into(),
        name: "Juan carlos bodoque".into(),
        category: "Marioneta".into(), 
        price: 125,
        stock: 12,
        minimum: 10,
        description: "Es una marioneta muy bonita de un color rojo vivo".into(),
        active: true,
    };

    let product2 = models::product::Product {
        code: "TP02".into(),
        name: "Tulio triviño".into(),
        category: "Marioneta".into(), 
        price: 200,
        stock: 25,
        minimum: 1,
        description: "Es una marioneta con unos conocimientos muy amplios".into(),
        active: true,
    };
    
    let _ = services::product_repo::insert_product(&product);
    let _ = services::product_repo::insert_product(&product2);

    let _ = services::product_repo::all_products(); // al final del metodo este hay un print pa ver si se agregaron
}

pub fn put_product(){
    let product1 = models::product::Product {
        code: "PRD001".into(),
        name: "Guantes de Nitrilo (Caja x100)".into(),
        category: "Insumos Médicos".into(),
        price: 35000,
        stock: 50,
        minimum: 10,
        description: "Talla M. Para procedimientos no estériles.".into(),
        active: true,
    };

    let product2 = models::product::Product {
        code: "PRD002".into(),
        name: "Jeringa 3ml (Caja x100)".into(),
        category: "Insumos Médicos".into(),
        price: 70000,
        stock: 40,
        minimum: 10,
        description: "Jeringa estéril Luer Lock para extracciones.".into(),
        active: true,
    };

    let product3 = models::product::Product {
        code: "PRD003".into(),
        name: "Ácido Hialurónico (Vial 1ml)".into(),
        category: "Productos Estéticos".into(),
        price: 450000,
        stock: 20,
        minimum: 5,
        description: "Relleno dérmico para labios y surcos. Marca Restylane.".into(),
        active: true,
    };

    let product4 = models::product::Product {
        code: "PRD004".into(),
        name: "Toxina Botulínica (Vial 100U)".into(),
        category: "Productos Estéticos".into(),
        price: 620000,
        stock: 15,
        minimum: 3,
        description: "Toxina tipo A para arrugas de expresión. Requiere refrigeración.".into(),
        active: true,
    };

    let product5 = models::product::Product {
        code: "PRD005".into(),
        name: "Kit de Plasma Rico (PRP)".into(),
        category: "Tratamientos".into(),
        price: 180000,
        stock: 25,
        minimum: 10,
        description: "Kit estéril para una sesión de PRP. Incluye tubos y reactivo.".into(),
        active: true,
    };

    let product6 = models::product::Product {
        code: "PRD006".into(),
        name: "Punta de Micropunción (x12)".into(),
        category: "Equipamiento".into(),
        price: 250000,
        stock: 30,
        minimum: 5,
        description: "Cartucho estéril de 12 agujas para Dermapen.".into(),
        active: true,
    };

    let product7 = models::product::Product {
        code: "PRD007".into(),
        name: "Crema Anestésica Tópica (30g)".into(),
        category: "Insumos Médicos".into(),
        price: 90000,
        stock: 20,
        minimum: 5,
        description: "Crema de Lidocaína/Prilocaína para pre-procedimiento.".into(),
        active: true,
    };

    let product8 = models::product::Product {
        code: "PRD008".into(),
        name: "Crema Hidratante Post-Láser".into(),
        category: "Productos Estéticos".into(),
        price: 120000,
        stock: 30,
        minimum: 10,
        description: "Crema calmante para venta al paciente post-procedimiento.".into(),
        active: true,
    };

    let product9 = models::product::Product {
        code: "PRD009".into(),
        name: "Lente de Protección Láser (Op.)".into(),
        category: "Equipamiento".into(),
        price: 150000,
        stock: 5,
        minimum: 2,
        description: "Gafas de protección para operador de láser (1064nm).".into(),
        active: true,
    };

    let product10 = models::product::Product {
        code: "PRD010".into(),
        name: "Kit Peeling Químico (Glicólico)".into(),
        category: "Tratamientos".into(),
        price: 310000,
        stock: 12,
        minimum: 4,
        description: "Kit para 1 sesión de peeling químico. Incluye neutralizante.".into(),
        active: true,
    };

    let _ = services::product_repo::insert_product(&product1);
    let _ = services::product_repo::insert_product(&product2);
    let _ = services::product_repo::insert_product(&product3);
    let _ = services::product_repo::insert_product(&product4);
    let _ = services::product_repo::insert_product(&product5);
    let _ = services::product_repo::insert_product(&product6);
    let _ = services::product_repo::insert_product(&product7);
    let _ = services::product_repo::insert_product(&product8);
    let _ = services::product_repo::insert_product(&product9);
    let _ = services::product_repo::insert_product(&product10);

}