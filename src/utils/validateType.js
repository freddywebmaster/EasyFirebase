export function isString(value) {
    if (typeof value === 'string') return true;
    return false;
}

export function isNumber(value) {
    if (typeof value === 'number') return true;
    return false;
}

export function isBool(value) {
    if (typeof value === 'boolean') return true;
    return false;
}

export function isObject(value) {
    if (Array.isArray(value)) return false;
    if (typeof value === 'object') return true;
    return false;
}

export function isArray(value) {
    if (Array.isArray(value)) return true;
    return false;
}

export function VALIDATE_TYPE(type, value) {
    switch (type) {
        case 'string':
            return isString(value)
        case 'number':
            return isNumber(value)
        case 'boolean':
            return isBool(value)
        case 'object':
            return isObject(value);
        case 'array':
            return isArray(value)
        default:
            return undefined;
    }
}

export function GET_TYPE(value) {

    const string = isString(value);
    const number = isNumber(value);
    const boolean = isBool(value);
    const object = isObject(value);
    const array = isArray(value);

    if(string) return 'string';
    if(number) return 'number';
    if(boolean) return 'boolean';
    if(object) return 'object';
    if(array) return 'array';
    if(value===null) return 'null';
    if(value===undefined) return 'undefined';
}