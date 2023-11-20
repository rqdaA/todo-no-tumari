import React, {useContext, useState} from 'react';
import {LoginUserContext} from "./LoginUserProvider";

const handleSubmit = () => {
}

function LoginForm() {
    const [email, setEmail] = useState('')
    const [pwd, setPwd] = useState('')
    const {loginUser, setLoginUser} = useContext(LoginUserContext)
    return <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        <label>
            email: <input type="email" value={email} onChange={e => setEmail(e.target.value)}/>
        </label>
        <label>
            password: <input type="password" value={pwd} onChange={e => setPwd(e.target.value)}/>
        </label>
        <button>Login</button>
    </form>
}

export default LoginForm;