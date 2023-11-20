import React, {createContext, Dispatch, FC, ReactNode, SetStateAction, useState} from 'react';

export const LoginUserContext = createContext({} as { loginUser: User, setLoginUser: Dispatch<SetStateAction<User>> })

export const LoginUserProvider: FC<{ children: ReactNode }> = (props) => {
    const {children} = props
    const [loginUser, setLoginUser] = useState({} as User)
    return <LoginUserContext.Provider value={{loginUser, setLoginUser}}>
        {children}
    </LoginUserContext.Provider>
}