import React, {useContext} from 'react';
import {LoginUserContext} from "./LoginUserProvider";
import {useForm} from "react-hook-form";
import {Link} from "react-router-dom";


interface ILoginForm {
    userName: string,
    password: string,
}

function LoginForm() {
    const {setLoginUser} = useContext(LoginUserContext)
    const {register, handleSubmit, formState: {errors},} = useForm<ILoginForm>({reValidateMode: 'onSubmit'});
    const onSubmit = (data: ILoginForm) => {
        setLoginUser({created_at: new Date(), discord_id: undefined, name: data.userName, todo_list: []})
        console.log(data)
    }
    return <>
        <form onSubmit={handleSubmit(onSubmit)}>
            <h1>Login</h1>
            <label>
                userName: <input placeholder="userName" {...register("userName", {
                required: true,
                minLength: 2,
                maxLength: 32
            })} />
            </label>
            <label>
                password: <input type="password" {...register("password", {
                required: true,
            })} />
            </label>
            <input type='submit'/>
        </form>
        <Link to="/signup">
            <p>Sign Up</p>
        </Link>
    </>
}

export default LoginForm;
