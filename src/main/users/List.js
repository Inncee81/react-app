import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Icon } from '_/component/Icon'

import { format } from '_/helpers/format'
import { localMap } from '_/helpers/storeMap'
import { useFormLocal } from '_/hooks/useForm'
import { userService } from '_/services/userService'

export const List = () => {
    const [list, setList] = useFormLocal('users-list', null)
    const onReload = () => {
        userService.getAll()
            .then(it => {
                setList(it.value)
            })
    }
    useEffect(onReload, [setList])

    return (
        <div className="animate__animated animate__fadeIn animate__faster">
            <h3>
                <button onClick={onReload} className="btn btn-lg">
                    <Icon name="refresh" />
                </button>
                Lista de Usuarios
            </h3>
            <Link to="/add"
                className="btn btn-sm btn-success mb-2">
                Add User
            </Link>
            <table className="table table-sm">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>NAME</th>
                        <th>SIZE</th>
                        <th>DESCRIPTION</th>
                        <th>CREATED AT</th>
                        <th>UPDATED AT</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {!list && <tr><td colSpan={10}><div className="spinner-border spinner-border-lg align-center"></div></td></tr>}
                    {list && list.map(it => <ListItem it={it} key={it.id} />)}
                    {list && !list.length && <tr><td colSpan={10}>Sin Registros</td></tr>}
                </tbody>
            </table>
        </div>
    )
}


const ListItem = ({ it }) => {
    const onCache = () => {
        localMap.put('users-item', it)
    }
    return (
        <tr>
            <td>{it.id}</td>
            <td>{it.name}</td>
            <td>{it.size}</td>
            <td>{it.description}</td>
            <td>{format.date(it.createdAt)}</td>
            <td>{format.date(it.updatedAt)}</td>
            <th>
                <Link to={`/edit/${it.id}`}
                    onClick={onCache}
                    className="btn btn-sm">
                    Edit
                </Link>
                <Link to={`/view/${it.id}`}
                    onClick={onCache}
                    className="btn btn-sm">
                    Eliminar
                </Link>
            </th>
        </tr>
    )
}
