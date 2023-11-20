import React, {useContext} from 'react';
import App from './App';
import {createRoot} from "react-dom/client";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import LoginForm from "./LoginForm";
import Header from "./Header";
import {LoginUserProvider} from "./LoginUserProvider";
import SignupForm from "./SignupForm";

const root_dom = document.getElementById('root')
if (root_dom != null) {
    const root = createRoot(root_dom)
    root.render(
        <React.StrictMode>
            <BrowserRouter>
                <LoginUserProvider>
                    <Header/>
                    <Routes>
                        <Route path="/login" element={<LoginForm/>}/>
                        <Route path="/signup" element={<SignupForm/>}/>
                        <Route path="/" element={<App/>}/>
                        <Route path="*" element={<p>get out!</p>}/>
                    </Routes>
                </LoginUserProvider>
            </BrowserRouter>
        </React.StrictMode>,
    );
}