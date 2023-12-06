import React, {ChangeEvent, useContext, useState} from 'react';
import {LoginUserContext} from "./LoginUserProvider";
import {TodoItem, User} from "./interface";


const generateId = (user: User, todo: TodoItem): string => `${user.name}_${todo.id}`
const splitId = (id: string): [string, number] => [id.split('_')[0], parseInt(id.split('_')[1])]


function userTodoList(user: User) {
}

function TodoList() {
    const admin: User = {
        name: 'rona',
        discord_id: undefined,
        created_at: new Date(),
        todo_list: [{id: 0, name: 'cleaning', done: false}, {id: 1, name: 'buy coffee', done: true}]
    }
    const general_user: User = {
        name: 'ryoga.exe',
        discord_id: undefined,
        created_at: new Date(1970, 0, 1),
        todo_list: [{id: 0, name: 'burn', done: true}, {id: 1, name: 'die', done: true}]
    }
    const [users, setUsers] = useState([admin, general_user])
    const {loginUser, setLoginUser} = useContext(LoginUserContext)

    const clickHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const [userName, todoId] = splitId(e.target.name)
        setUsers(prevUsers => {
                for (let i in prevUsers) {
                    if (prevUsers[i].name != userName)
                        continue
                    let todos = prevUsers[i].todo_list
                    for (let j in todos) {
                        if (todos[j].id != todoId)
                            continue
                        prevUsers[i].todo_list[j].done = !todos[j].done
                    }
                }
                return [...prevUsers]
            }
        )
    }

    return <>
        {users.map(user =>
            <div>
                {loginUser && user.name === loginUser.name ? <h2>ME: {user.name}</h2> : <h2>{user.name}</h2>}
                <div>
                    {user.todo_list.map(todo =>
                        <label>
                            <input name={generateId(user, todo)} type="checkbox" checked={todo.done}
                                   onChange={clickHandler}/>{todo.name}
                        </label>
                    )
                    }
                </div>
            </div>
        )
        }
    </>
}

export default TodoList;
