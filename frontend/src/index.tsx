import React from 'react';
import App from './App';
import {createRoot} from "react-dom/client";
import {BrowserRouter} from "react-router-dom";

const root_dom = document.getElementById('root')
if (root_dom != null) {
    const root = createRoot(root_dom)
    root.render(
        <React.StrictMode>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </React.StrictMode>,
    );
}
