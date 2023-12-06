import React, {useContext} from 'react';
import {LoginUserContext} from "./LoginUserProvider";
import {useForm} from "react-hook-form";
import {Link} from "react-router-dom";

interface ISignupForm {
    userName: string,
    password: string,
    retypePassword: string
}

function SignupForm() {
    const {setLoginUser} = useContext(LoginUserContext)
    const {register, handleSubmit, formState: {errors},} = useForm<ISignupForm>({reValidateMode: 'onSubmit'});
    const onSubmit = (data: ISignupForm) => {
        setLoginUser({created_at: new Date(), discord_id: undefined, name: data.userName, todo_list: []})
        console.log(data)
    }
    return <>
        <form onSubmit={handleSubmit(onSubmit)}>
            <h1>SignUp</h1>
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
            <label>
                retype password: <input type="password" {...register("retypePassword", {
                required: true,
            })} />
            </label>
            <input type='submit'/>
        </form>
        <Link to="/login">
            <p>Login</p>
        </Link>
    </>
}

export default SignupForm;
