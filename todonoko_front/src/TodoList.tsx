import React, {useContext, useState} from 'react';
import {LoginUserContext} from "./LoginUserProvider";

const generateId = (todo: TodoItem): string => (todo.name + `${todo.id}`)

function userTodoList(user: User) {
    return user.todoList.map(todo =>
        <label>
            <input name={generateId(todo)} type="checkbox" checked={todo.done}/>{todo.name}
        </label>
    )
}

function TodoList() {
    const admin: User = {
        name: 'rona',
        discord_id: undefined,
        created_at: 0,
        todoList: [{id: 0, name: 'cleaning', done: false}, {id: 1, name: 'buy coffee', done: true}]
    }
    const general_user: User = {
        name: 'ryoga.exe',
        discord_id: undefined,
        created_at: 0,
        todoList: [{id: 0, name: 'burn', done: true}, {id: 1, name: 'die', done: true}]
    }
    const [users, setUsers] = useState([admin, general_user])
    const {loginUser} = useContext(LoginUserContext)

    return users.map(user =>
        <>
            <h1>{user.name}</h1>
            <div>{userTodoList(user)}</div>
        </>
    )
}

export default TodoList;