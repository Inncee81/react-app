import { localMap } from "./storeMap";

export const createFetchStore = () => {
    return (url, opts) => {
        const request = createRequest(url, opts)
        return new Promise((resolve, reject) => {
            console.info(request.method, request.url);
            setTimeout(() => processRequest(request, resolve, reject), 400);
        });
    };
}

const createRequest = (url, opts) => {
    let { method, body } = opts
    let { host, pathname } = new URL(url)
    const index = pathname.indexOf('/api')
    if (index !== -1) {
        host = host + pathname.substr(0, index + 4)
        pathname = pathname.substr(index + 4)
    }
    let paths = pathname.replaceAll(/\/+/g, '/').split('/')
    paths.shift()
    paths = paths.map(name => {
        const number = parseInt(name);
        return isNaN(number) ? { value: name, type: 'NAME' } : { value: number, type: 'ID' }
    })
    body = body ? JSON.parse(body) : body;
    return {
        url,
        host,
        paths,
        method,
        body
    }
}



const processRequest = (request, resolve, reject) => {
    const { method, body, host, paths } = request
    let storeData = localMap.get(host, { data: {} });
    let refParent = storeData;
    let refData = storeData.data;
    let refResult = {
        success: true
    }
    //----------------------------
    paths.forEach(({ value, type }) => {
        if (!refResult.success) {
            //continue
        } else if (type === 'NAME' && typeof refData === "object") {
            if (!refData[value]) {
                refData[value] = []
            }
            refParent = refData
            refData = refParent[value]
        } else if (type === 'ID' && Array.isArray(refData)) {
            refParent = refData
            refData = refParent.find(it => it.id === value);
        } else {
            refResult.success = false
            refResult.message = 'Error en el procesamiento del path'
        }
    })
    //----------------------------
    const { value, type } = paths[paths.length - 1]
    if (!refResult.success) {
        //continue
    } else if (type === 'ID') {
        if (!refData) {
            refResult.success = false
            refResult.message = 'Registro no encontrado: ' + value
        } else if (method === 'GET' || method === 'FIND' || method === 'LOOKUP') {
            refResult.value = refData;
        } else if (method === 'PUT' || method === 'UPDATE') {
            const index = refParent.findIndex(it => it.id === value);
            body.id = parseInt(body.id)
            body.updatedAt = new Date();
            refParent[index] = { ...refData, ...body }
            refResult.value = refParent[index];
        } else if (method === 'DELETE' || method === 'REMOVE') {
            const index = refParent.findIndex(it => it.id === value);
            refParent.splice(index, 1);
        } else {
            refResult.success = false
            refResult.message = 'Metod not allowed'
        }
    } else if (type === 'NAME') {
        if (method === 'GET' || method === 'LIST') {
            refResult.value = refData;
        } else if (method === 'POST' || method === 'CREATE') {
            body.id = parseInt(body.id) || new Date().getTime()
            const refExist = refData.find(it => it.id === body.id)
            if (refExist) {
                refResult.success = false
                refResult.message = 'ID ya existe - ' + body.id;
                refResult.value = undefined
            } else {
                body.createdAt = new Date();
                refData.push(body)
                refResult.value = body
            }
        } else {
            refResult.success = false
            refResult.message = 'Metod not allowed'
        }
    } else {
        refResult.success = false
        refResult.message = 'Error: param not allowed'
    }
    localMap.put(host, storeData)
    if (refResult.success) {
        resolve({
            ok: true,
            text: () => Promise.resolve(JSON.stringify(refResult, null, 2)),
            json: () => Promise.resolve(refResult)
        });
    } else {
        refResult.traces = {
            method,
            paths
        }
        reject({
            ok: false,
            text: () => Promise.resolve(JSON.stringify(refResult, null, 2)),
            json: () => Promise.resolve(refResult)
        });
    }
}

