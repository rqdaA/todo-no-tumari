import React, {createContext, Dispatch, FC, ReactNode, SetStateAction, useState} from 'react';
import {User} from './interface'

export const LoginUserContext = createContext({} as {
    loginUser: User | undefined,
    setLoginUser: Dispatch<SetStateAction<User>>
})

export const LoginUserProvider: FC<{ children: ReactNode }> = ({children}) => {
    const noone: User = {
        name: "noone",
        created_at: new Date(),
        discord_id: undefined,
        todo_list: []
    }
    const [loginUser, setLoginUser] = useState(noone)
    return <LoginUserContext.Provider value={{loginUser, setLoginUser}}>
        {children}
    </LoginUserContext.Provider>
}
