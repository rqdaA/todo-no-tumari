mod auth;

use actix_identity::{Identity, IdentityMiddleware};
use actix_web::{get, web, App, HttpResponse, HttpServer, Responder};
use chrono::prelude::*;
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]
struct TodoItem {
    id: usize,
    name: String,
    done: bool,
}

#[derive(Serialize, Deserialize)]
struct User {
    name: String,
    discord_id: Option<usize>,
    created_at: DateTime<Utc>,
    todo_list: Vec<TodoItem>,
}

#[get("/")]
async fn index(user: Option<Identity>) -> impl Responder {
    if let Some(user) = user {
        return HttpResponse::Ok().body(user.id().unwrap());
    }
    HttpResponse::Unauthorized().body("good bye ;w;")
}

#[get("/todos")]
async fn get_all_todos() -> impl Responder {
    // todo: "retrieve from DB"
    "wip"
}

#[get("/{user}/todos")]
async fn get_user_todos(path: web::Path<String>) -> impl Responder {
    let user_name: &String = &path.into_inner();
    let u = User {
        name: user_name.clone(),
        discord_id: Some(32),
        created_at: Utc::now(),
        todo_list: vec![TodoItem {
            id: user_name.clone().len(),
            name: String::from("task A"),
            done: false,
        }],
    };
    HttpResponse::Ok().json(u.todo_list)
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(move || {
        App::new()
            .wrap(IdentityMiddleware::default())
            .service(index)
            .service(get_all_todos)
            .service(get_user_todos)
            .service(auth::login)
    })
    .bind("127.0.0.1:8080")?
    .run()
    .await
}
