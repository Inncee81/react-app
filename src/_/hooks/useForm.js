import { useEffect, useState } from 'react';
import { localMap, sessionMap } from '_/helpers/storeMap';


export const useForm = (initialState, validationSchema = {}) => {
    const [values, setValues] = useState(initialState);
    //------------------------
    const handlerRestore = (value = initialState) => setValues(value);
    const handlerChange = (event) => processOnChange(event, values, setValues);
    const handlerValidate = () => processOnValidation(values, validationSchema);
    //------------------------
    return [values, setValues, handlerChange, handlerValidate, handlerRestore];
}

export const useFormLocal = (key, initialState, validationSchema = {}) => {
    const initialValues = localMap.get(key, initialState);
    const [values, setValues] = useState(initialValues);
    //------------------------
    const handlerRestore = (value = initialState) => setValues(value);
    const handlerChange = (event) => processOnChange(event, values, setValues);
    const handlerValidate = () => processOnValidation(values, validationSchema);
    //------------------------
    useEffect(() => localMap.put(key, values), [key, values])
    return [values, setValues, handlerChange, handlerValidate, handlerRestore];
}

export const useFormSession = (key, initialState, validationSchema = {}) => {
    const initialValues = sessionMap.get(key, initialState)
    const [values, setValues] = useState(initialValues);
    //------------------------
    const handlerRestore = (value = initialState) => setValues(value);
    const handlerChange = (event) => processOnChange(event, values, setValues);
    const handlerValidate = () => processOnValidation(values, validationSchema);
    //------------------------
    useEffect(() => sessionMap.put(key, values), [key, values])
    return [values, setValues, handlerChange, handlerValidate, handlerRestore];
}

const processOnChange = (event, values, setValues) => {
    let { name, value } = event.target;
    let newValues = Array.isArray(values) ? [...values] : { ...values }
    if (name.indexOf('.') !== -1) {
        let names = name.split('.')
        let refValues = newValues;
        name = names.pop()
        names.forEach(it => {
            if (!refValues[it]) {
                refValues[it] = {}
            }
            refValues = refValues[it]
        });
        refValues[name] = value;
    } else {
        newValues[name] = value;
    }
    setValues(newValues);
}


const processOnValidation = (values, validations) => {
    return false;
}