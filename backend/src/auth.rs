use crate::interface::User;
use crate::SESSION_COOKIE_NAME;

fn session_user(session_cookie: &String) -> Option<User> {
    User {
        name: "".to_string(),
        discord_id: None,
        todo_list: vec![],
    }
}

pub fn has_login(session: &actix_session::Session) -> Result<Option<User>, String> {
    match session.get::<String>(SESSION_COOKIE_NAME) {
        Ok(session_cookie) => match session_cookie {
            Some(session_cookie) => Ok(session_user(&session_cookie)),
            None => Err(String::from("Not valid session cookie"))
        },
        Err(_) => Err(String::from("Error while reading cookie"))
    }
}