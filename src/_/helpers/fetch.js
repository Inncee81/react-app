import { createFetchStore } from "./fetchStore";

const target = 'http://127.0.0.1:4000/app/api'//process.env.REACT_APP_API_URL;

//const delegateFetch = fetch;
window.fetch = createFetchStore();

export const setToken = (value) => {
    localStorage.setItem('token', value);
}

export const getToken = () => {
    return localStorage.getItem('token') || '====NONE====';
}

export const fetchRaw = (path, props) => {
    return fetch(target + path, props);
}

export const fetchToken = (path, props = {}) => {
    let { headers = {} } = props
    headers['Authorization'] = 'Bearer ' + getToken();
    props.headers = headers
    return fetch(target + path, props);
}

export const createHttp = (fetchWrapper, handleRequest = async (res) => await res.json()) => {
    return {
        get: (url) => {
            return fetchWrapper(url, {
                method: 'GET'
            }).then(handleRequest);
        },
        post: (url, body) => {
            return fetchWrapper(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            }).then(handleRequest);
        },
        put: (url, body) => {
            return fetchWrapper(url, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            }).then(handleRequest);
        },
        delete: (url) => {
            return fetchWrapper(url, {
                method: 'DELETE'
            }).then(handleRequest);
        },
        //----------CURSTOM----------
        lookup: (url) => {
            return fetchWrapper(url, {
                method: 'LOOKUP'
            }).then(handleRequest);
        },
        filter: (url, body) => {
            return fetchWrapper(url, {
                method: 'FILTER',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            }).then(handleRequest);
        },
        create: (url, body) => {
            return fetchWrapper(url, {
                method: 'CREATE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            }).then(handleRequest);
        },
        update: (url, body) => {
            return fetchWrapper(url, {
                method: 'UPDATE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            }).then(handleRequest);
        },
        remove: (url) => {
            return fetchWrapper(url, {
                method: 'REMOVE'
            }).then(handleRequest);
        },
        launch: (url, body) => {
            return fetchWrapper(url, {
                method: 'LAUNCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            }).then(handleRequest);
        }
    }
}

export const httpRaw = createHttp(fetchRaw)

export const httpToken = createHttp(fetchToken)