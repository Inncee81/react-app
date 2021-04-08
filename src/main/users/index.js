import React from 'react'
import { Redirect, Route, Switch } from "react-router";
import { BrowserRouter, HashRouter, MemoryRouter } from "react-router-dom";

import { Form } from "./Form";
import { Info } from './Info';
import { List } from "./List";

export const UserBrowserIndex = () => {
    return (
        <BrowserRouter basename={process.env.PUBLIC_URL + '/users-browser'}>
            <UserContent title="Gestion de Usuarios - Navegacion en Browser" />
        </BrowserRouter>
    )
}

export const UserMemoryIndex = () => {
    return (
        <MemoryRouter>
            <UserContent title="Gestion de Usuarios - Navegacion en Memoria" />
        </MemoryRouter>
    )
}

export const UserHashIndex = () => {
    return (
        <HashRouter>
            <UserContent title="Gestion de Usuarios - Navegacion en Hash" />
        </HashRouter>
    )
}

const UserContent = ({ title }) => {
    return (
        <div className="card">
            <h1 className="card-header">{title}</h1>
            <div className="card-body">
                <Switch>
                    <Route exact path="/" component={List} />
                    <Route path="/add" component={Form} />
                    <Route path="/edit/:id" component={Form} />
                    <Route path="/view/:id" component={Info} />
                    <Redirect to="/" />
                </Switch>
            </div>
        </div>
    )
}