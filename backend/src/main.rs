use actix_session::config::{BrowserSession, CookieContentSecurity};
use actix_session::SessionMiddleware;
use actix_session::storage::CookieSessionStore;
use actix_web::cookie::SameSite;
use actix_web::{HttpResponse, Responder};
use serde::{Deserialize, Serialize};
use sqlx::{migrate::MigrateDatabase, Sqlite, FromRow, SqlitePool, Row};

mod auth;
mod interface;
mod database;

const SESSION_COOKIE_NAME: &str = "session";

#[allow(non_snake_case)]
#[derive(Serialize, Deserialize)]
struct SignupForm {
    userName: String,
    password: String,
    retypePassword: String,
}

#[allow(non_snake_case)]
#[derive(Serialize, Deserialize)]
struct LoginForm {
    userName: String,
    password: String,
}

#[actix_web::get("/todos")]
async fn fetch_all_todos(session: actix_session::Session) -> impl Responder {
    HttpResponse::Ok().body("YES")
}

#[actix_web::post("/signup")]
async fn signup(form: actix_web::web::Form<SignupForm>, session: actix_session::Session) -> impl Responder {
    if form.password != form.retypePassword {
        return HttpResponse::BadRequest().body("Field password and retypePassword do not match");
    }
    if !Sqlite::database_exists(DB_PATH).await.unwrap_or(false) {
        return HttpResponse::InternalServerError().body("No DB found");
    }

    match auth::has_login(&session) {
        Ok(user) => {
            let db = SqlitePool::connect(DB_PATH).await.unwrap();
            let result = sqlx::query("INSERT INTO users (name) VALUES ($1)")
                .bind(&form.userName)
                .execute(&db)
                .await
                .unwrap();
            HttpResponse::Ok().body("OK!")
        }
        Err(err) => HttpResponse::BadRequest().body(err)
    }
}


#[actix_web::post("/login")]
async fn login(form: actix_web::web::Form<LoginForm>, session: actix_session::Session) -> impl Responder {
    #[allow(non_snake_case)]
    #[derive(Clone, FromRow, Debug)]
    struct QUser {
        name: String,
        discord_id: Option<i64>,
    }

    let db = SqlitePool::connect("sqlite://sqlite/main.sqlite3").await.unwrap();
    let users_result = sqlx::query_as::<_, QUser>("SELECT name,discord_id FROM users")
        .fetch_all(&db)
        .await
        .unwrap();
    let mut resp = String::new();
    for u in users_result {
        resp.push_str(&format!("{} {}\n", &u.name, u.discord_id.unwrap_or(114)));
    }
    HttpResponse::Ok().body(resp)
}

fn session_middleware() -> SessionMiddleware<CookieSessionStore> {
    SessionMiddleware::builder(
        CookieSessionStore::default(), actix_web::cookie::Key::from(&[0; 64]),
    )
        .cookie_name(String::from(SESSION_COOKIE_NAME))
        .cookie_secure(false)
        .session_lifecycle(BrowserSession::default())
        .cookie_same_site(SameSite::Strict)
        .cookie_content_security(CookieContentSecurity::Private)
        .cookie_http_only(true)
        .build()
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    actix_web::HttpServer::new(|| {
        actix_web::App::new()
            .wrap(session_middleware())
            .service(signup)
            .service(login)
    })
        .bind(("127.0.0.1", 8080))?
        .run()
        .await
}