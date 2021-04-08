import { httpRaw } from '_/helpers/fetch';

const path = '/users';

export const userService = {
    getAll: () => {
        return httpRaw.get(path);
    },
    getById: (id) => {
        return httpRaw.get(`${path}/${id}`);
    },
    create: (params) => {
        return httpRaw.post(path, params);
    },
    update: (id, params) => {
        return httpRaw.put(`${path}/${id}`, params);
    },
    delete: (id) => {
        return httpRaw.delete(`${path}/${id}`);
    },
};
