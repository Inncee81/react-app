

export const dateFormat = (value) => {
    if (typeof value === 'string') {
        value = Date.parse(value)
    }
    if (typeof value === 'number') {
        value = new Date(value)
    }
    if (value instanceof Date) {
        return value.toLocaleString('es-BO');
    }
    return value;
}
export const numberFormat = (value) => {
    return value
}
export const moneyFormat = (value, currency = 'BOB') => {
    if (value === undefined) {
        return '';
    }
    if (typeof value === 'string') {
        value = parseFloat(value)
    }
    if (typeof value === 'number') {
        return value.toLocaleString('es-BO', { style: 'currency', currency })
    }
    return value + ' ' + currency
}


export const format = {
    date: dateFormat,
    number: numberFormat,
    money: moneyFormat
}