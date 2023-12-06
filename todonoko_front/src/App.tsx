import React, {FC} from 'react';
import {Navigate, Outlet, Route, Routes} from "react-router-dom";
import TodoList from "./TodoList";
import InputForm from "./InputForm";
import {LoginUserProvider} from "./LoginUserProvider";
import {User} from "./interface";
import LoginForm from "./LoginForm";
import Header from "./Header";
import SignupForm from "./SignupForm";


interface IPrivateRoute {
    children: React.ReactNode
    redirectTo: string
}

const PrivateOutlet = () => {
        if (true) {
            return <Outlet/>
        } else {
            return <Navigate to='login'/>
        }
    }
;

function App() {
    const user: User = {created_at: new Date(), discord_id: undefined, name: "", todo_list: []};
    return (
        <LoginUserProvider>
            <header>
                <Header/>
            </header>
            <main>
                <Routes>
                    <Route path="/" element={<PrivateOutlet/>}>
                        <Route path="" element={<><TodoList/><InputForm/></>}/>
                    </Route>
                    <Route path="/login" element={<LoginForm/>}/>
                    <Route path="/signup" element={<SignupForm/>}/>
                    <Route path="*" element={<p>get out</p>}/>
                </Routes>
            </main>
        </LoginUserProvider>
    )
}


export default App;
