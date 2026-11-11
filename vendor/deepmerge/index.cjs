'use strict';

const BLOCKED_KEYS = new Set(['__proto__', 'constructor', 'prototype']);

function isPlainObject(value) {
    if (value === null || typeof value !== 'object') {
        return false;
    }
    const prototype = Object.getPrototypeOf(value);
    return prototype === Object.prototype || prototype === null;
}

function clone(value) {
    if (Array.isArray(value)) {
        return value.map(clone);
    }
    if (!isPlainObject(value)) {
        return value;
    }
    const output = {};
    for (const key of Object.keys(value)) {
        if (BLOCKED_KEYS.has(key)) {
            continue;
        }
        output[key] = clone(value[key]);
    }
    return output;
}

function deepmerge(target, source) {
    if (Array.isArray(target) && Array.isArray(source)) {
        return target.concat(source).map(clone);
    }
    if (!isPlainObject(target) || !isPlainObject(source)) {
        return clone(source);
    }
    const output = clone(target);
    for (const key of Object.keys(source)) {
        if (BLOCKED_KEYS.has(key)) {
            continue;
        }
        const sourceValue = source[key];
        if (Array.isArray(sourceValue) && Array.isArray(output[key])) {
            output[key] = output[key].concat(sourceValue).map(clone);
        } else if (isPlainObject(sourceValue) && isPlainObject(output[key])) {
            output[key] = deepmerge(output[key], sourceValue);
        } else {
            output[key] = clone(sourceValue);
        }
    }
    return output;
}

module.exports = deepmerge;
