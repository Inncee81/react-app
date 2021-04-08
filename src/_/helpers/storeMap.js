const createStore = (storage) => {
    return {
        get: (key, init = {}) => {
            try {
                let value = storage.getItem(key);
                return value ? JSON.parse(value) : init
            } catch (error) {
                console.warn('Storage.getItem', key, error);
                return init
            }
        },
        put: (key, value) => {
            try {
                storage.setItem(key, JSON.stringify(value))
            } catch (error) {
                console.error('Storage.setItem', key, value, error);
            }
        },
        remove: (key) => {
            storage.removeItem(key)
        },
        clean: () => {
            storage.clean()
        }
    }
}

export const localMap = createStore(localStorage);

export const sessionMap = createStore(sessionStorage);
