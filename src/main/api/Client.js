import { createFetchStore } from '_/helpers/fetchStore'
import { useForm } from '_/hooks/useForm';
import React from 'react'

const fetchStore = createFetchStore();

const INIT = {
    target: 'http://127.0.0.1:4000/app/api',
    path: '/users',
    url: '========',
    data: {
        id: 1,
        name: ''
    },
    raw: '?'
}
export const Client = () => {
    const [form, setForm, onChange] = useForm(INIT)

    const onCall = (method, args) => {
        const body = JSON.stringify(form.data)
        const url = form.target + form.path + args
        setForm(it => ({ ...it, url }))
        console.log('FETCH:', method, url, body);
        fetchStore(url, { method, body })
            .then(async response => {
                const raw = await response.text()
                setForm(it => ({ ...it, raw }))
            })
            .catch(async error => {
                const raw = 'Error to call service'
                setForm(it => ({ ...it, raw }))
            })
    }

    return (
        <div>
            <h3>API CLIENT</h3>
            <fieldset>
                <legend>URL</legend>
                Target:
                <input name="target"
                    value={form.target}
                    onChange={onChange}
                    className="form-control" />
                Path:
                <input name="path"
                    value={form.path}
                    onChange={onChange}
                    className="form-control" />
            </fieldset>
            <br />
            <fieldset>
                <legend>DATA</legend>
                ID:
                <input name="data.id"
                    value={form.data.id}
                    onChange={onChange}
                    className="form-control" />
                NAME:
                <input name="data.name"
                    value={form.data.name}
                    onChange={onChange}
                    className="form-control" />
            </fieldset>
            <div className="btn-groups m-2">
                <button onClick={e => onCall('LIST', '')}
                    className="btn btn-primary">
                    LIST ALL
                </button>
                <button onClick={e => onCall('FIND', '/' + form.data.id)}
                    className="btn btn-primary">
                    FIND DATA
                </button>
                <button onClick={e => onCall('CREATE', '')}
                    className="btn btn-primary">
                    CREATE DATA
                </button>
                <button onClick={e => onCall('UPDATE', '/' + form.data.id)}
                    className="btn btn-primary">
                    UPDATE DATA
                </button>
                <button onClick={e => onCall('REMOVE', '/' + form.data.id)}
                    className="btn btn-primary">
                    REMOVE DATA
                </button>
            </div>
            <span className="form-control">{form.url}</span>
            <pre className="card bg-light p-2">
                <code>{form.raw}</code>
            </pre>
        </div>
    )
}
