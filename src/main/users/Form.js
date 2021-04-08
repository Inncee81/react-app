import React, { useEffect } from 'react'
import { useHistory, useParams } from 'react-router'

import { localMap } from '_/helpers/storeMap'
import { useForm } from '_/hooks/useForm'
import { userService } from '_/services/userService'

const USER_INIT = {
    id: 0,
    name: '',
    size: 0,
    description: ''
}
export const Form = () => {
    const { id: idString } = useParams();
    const id = parseInt(idString)
    let history = useHistory();
    const [user, setUser, onUserChange] = useForm(USER_INIT)
    const onSubmit = (e) => {
        e.preventDefault();
        if (id) {
            let data = localMap.get('users-list').map(it => it.id === id ? user : it)
            localMap.put('users-list', data)
            userService.update(id, user)
                .then(onReturn)
        } else {
            let data = localMap.get('users-list', [])
            data.push(user)
            localMap.put('users-list', data)
            userService.create(user)
                .then(onReturn)
        }
    }
    const onReturn = () => {
        history.goBack()
    }
    const onReload = () => {
        const cache = localMap.get('users-item', USER_INIT)
        if (id === cache.id) {
            setUser(cache)
        } else if (id) {
            userService.getById(id)
                .then(it => {
                    setUser(it.value)
                })
                .catch(err => {
                    alert('Fetch Error : ', err);
                });
        }
    }
    useEffect(onReload, [id, setUser])
    return (
        <form onSubmit={onSubmit} className="animate__animated animate__fadeIn animate__faster">
            <div className="card">
                <header className="card-header h3">
                    Form User {id}
                </header>
                <main className="card-body">
                    <div>
                        Name:
                        <input name="name"
                            value={user.name}
                            onChange={onUserChange}
                            className="form-control" />
                        Size:
                        <input name="size"
                            value={user.size}
                            onChange={onUserChange}
                            type="number"
                            className="form-control" />
                        Description:
                        <input name="description"
                            value={user.description}
                            onChange={onUserChange}
                            className="form-control" />
                    </div>
                </main>
                <footer className="card-footer">
                    <button type="button"
                        className="btn btn-sm"
                        onClick={onReturn}>
                        Back
                    </button>
                    <button type="submit"
                        className="btn btn-sm btn-primary">
                        Guardar
                    </button>
                </footer>
            </div>
        </form>
    )
}
