use actix_session::config::{BrowserSession, CookieContentSecurity};
use actix_session::SessionMiddleware;
use actix_session::storage::CookieSessionStore;
use actix_web::cookie::SameSite;
use actix_web::{HttpResponse, Responder};
use chrono_tz::Asia::Tokyo;

mod auth;
mod interface;

const SESSION_COOKIE_NAME: &str = "session";

#[actix_web::get("/todos")]
async fn fetch_all_todos(session: actix_session::Session) -> impl Responder {
    
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
            .service(index)
    })
        .bind(("127.0.0.1", 8080))?
        .run()
        .await
}