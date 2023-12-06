use chrono::{DateTime, Utc};

#[allow(non_snake_case)]
pub struct Comment {
    pub owner: User,
    pub message: String,
    pub child: Vec<Comment>,
}

#[allow(non_snake_case)]
pub struct TodoItem {
    pub id: usize,
    pub name: String,
    pub done: bool,
    pub created_at: DateTime<Utc>,
    pub comments: Vec<Comment>,
}

#[allow(non_snake_case)]
pub struct User {
    pub name: String,
    pub discord_id: Option<usize>,
    pub todo_list: Vec<TodoItem>,
}