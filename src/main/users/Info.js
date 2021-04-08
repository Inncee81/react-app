import React, { useEffect } from 'react'
import { useHistory, useParams } from 'react-router'

import { Link } from 'react-router-dom';
import { localMap } from '_/helpers/storeMap';
import { useForm } from '_/hooks/useForm';
import { userService } from '_/services/userService'

const USER_INIT = {
    id: 0,
    name: '',
    description: ''
}
export const Info = () => {
    const { id: idString } = useParams();
    const id = parseInt(idString)
    let history = useHistory();
    const [user, setUser] = useForm(USER_INIT)
    const onSubmit = (e) => {
        e.preventDefault();
        userService.delete(id)
        history.goBack()
    }
    const onReload = () => {
        const cache = localMap.get('users-item', USER_INIT)
        if (id === cache.id) {
            setUser(cache)
        } else {
            userService.getById(id)
                .then(it => {
                    setUser(it.value)
                    console.log('GET_IT:', it);
                })
        }
    }
    useEffect(onReload, [id, setUser])
    return (
        <form onSubmit={onSubmit} className="animate__animated animate__fadeIn animate__faster">
            <div className="card">
                <header className="card-header h3">
                    Info User {id}
                </header>
                <main className="card-body">
                    Name:
                    <span className="form-control">{user.name}</span>
                    Description:
                    <span className="form-control">{user.description}</span>
                </main>
                <footer className="card-footer">
                    <Link to="/"
                        className="btn btn-sm">
                        Back
                    </Link>
                    <button type="submit"
                        className="btn btn-sm btn-danger">
                        Eliminar
                    </button>
                </footer>
            </div>
        </form>
    )
}
