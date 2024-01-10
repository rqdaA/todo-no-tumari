use sqlx::{migrate::MigrateDatabase, Pool, Sqlite, SqlitePool};

const DB_PATH: &str = "sqlite://sqlite/main.sqlite3";

struct DB {
    pool: Pool<Sqlite>,
}

impl DB {
    async fn default() -> Self {
        if !Sqlite::database_exists("sqlite://sqlite/main.sqlite3").await.unwrap_or(false) {
            panic!("Could not connect to DB");
        }
        let pool = match SqlitePool::connect(DB_PATH).await {
            Ok(pool) => pool,
            Err(_) => panic!("Could not connect to DB"),
        };
        Self { pool }
    }
}