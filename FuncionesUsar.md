### Funciones a usar para el front
Dentro del archivo `src-tauri\src\commands.rs` estan los comandos a usar para el frontend.

#### Login(Entry) -> Result<LoginResponse, String>
El Entry hace referencia un JSON que debería tener dos valores, estos son: username y password.

El método devuelve un Json como respuesta con tres valores:
```
{
    success: bool,
    message: String,
    username: String,
}
```