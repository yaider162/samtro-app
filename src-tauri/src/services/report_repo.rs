use crate::{models::{Report}};
use super::db;
use rusqlite::{Result, params};

// funcion para guardar reporte
pub fn save_report(report: &Report) -> Result<(), rusqlite::Error> {
    // Conecto con la base de datos
    let conn = db::get_connection()?;

    // inserto en la db el reporte
    conn.execute(
        "INSERT INTO reports (message, date, type) VALUES (?1, ?2, ?3)",
    params![ report.message, report.date, report._type])?;

    Ok(())
}

pub fn get_all_reports() -> Result<Vec<Report>, rusqlite::Error> {
    // Conecto con la base de datos
    let conn = db::get_connection()?;

    // Hago la consulta de los datos
    let mut stmt = conn.prepare("SELECT message, date, type FROM reports")?;

    // recorro los resultados y los mapeo a objetos Report
    let report_iter = stmt.query_map([], |row| {
        Ok(Report {
            message: row.get(0)?,
            date: row.get(1)?,
            _type: row.get(2)?,
        })
    })?;

    let mut reports = Vec::new();
    for report in report_iter {
        reports.push(report?);
    }
    Ok(reports)
}