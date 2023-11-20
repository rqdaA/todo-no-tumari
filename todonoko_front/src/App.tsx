import './App.css';
import React, {useState} from 'react';
import {Navigate, Route, RouteProps} from "react-router-dom";
import TodoList from "./TodoList";
import InputForm from "./InputForm";


const PrivateRoute: React.FC<RouteProps> = ({...props}) => {
        if (true) {
            return <Route {...props}/>
        } else {
            return <Navigate to='login'/>
        }
    }
;

function App() {
    return <main>
        <InputForm/>
        <TodoList/>
    </main>
}


export default App;