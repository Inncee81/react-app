import React from 'react'
import { Redirect, Route, Switch } from 'react-router'

import { Home } from 'main/home/Home'
import { Client } from 'main/api/Client'
import { UserBrowserIndex, UserHashIndex, UserMemoryIndex } from 'main/users'

export const Container = () => {
    return (
        <div className="container pt-4 pb-4">
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/users-hash" component={UserHashIndex} />
                <Route path="/users-memory" component={UserMemoryIndex} />
                <Route path="/users-browser" component={UserBrowserIndex} />
                <Route path="/api" component={Client} />
                <Redirect to="/" />
            </Switch>
        </div>
    )
}
