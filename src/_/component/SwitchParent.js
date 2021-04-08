import React from 'react'
import { Switch, Redirect, Route } from "react-router"

export const SwitchParent = ({ parent, children, ...props }) => {
    children = children.map(it => {
        const { path, to, ...props } = it.props
        switch (it.type) {
            case Route:
                props.path = parent + path
                props.key = parent + path
                break;
            case Redirect:
                props.to = parent + to
                props.key = parent + to
                break;
            default:
                break;
        }
        return React.cloneElement(it, props)
    })
    return (
        <Switch {...props} >
            {children}
        </Switch>
    )
}