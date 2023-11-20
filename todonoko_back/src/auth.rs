use actix_identity::Identity;
use actix_web::{http::header, post, web, HttpMessage, HttpRequest, HttpResponse, Responder};
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]
pub struct LoginParams {
    username: String,
    pwd: String,
}
#[post("/login")]
pub async fn login(req: HttpRequest, params: web::Form<LoginParams>) -> impl Responder {
    let user_name = &params.username;
    let pwd = &params.pwd;
    if pwd != "whoami" {
        return HttpResponse::Unauthorized().finish();
    }

    Identity::login(&req.extensions(), user_name.into()).unwrap();
    HttpResponse::SeeOther()
        .append_header((header::LOCATION, "/"))
        .finish()
}
