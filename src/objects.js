/*
    Merges own and inherited enumerable string keyed properties 
    of source objects into the destination object. */
   

function merge(destObj, ...sources) {
    for (const source of sources) {
      for (const key in source) {
        if (source[key]) {
            destObj[key] = source[key];
        }
      }
    }
    return destObj;
}

//console.log(merge({a: 1, b: 2},{c: 3, d: 4}));
/*
    Creates an object composed of the picked object properties. */


function pick(obj, paths) {
    let result = {};
    for (let i = 0; i < paths.length; i += 1) {
        let key = paths[i];
        if (obj[key]) {
            result = {...result, [key]: obj[key]};
        }
    }
    return result;
}


/*
    Creates an object composed of the object properties predicate returns truthy for.
    The predicate is invoked with two arguments: (value, key). */


function pickBy(obj, predicate) {
    let result = {};
    for (const key in obj) {
        if (predicate(obj[key])) {
            result = {...result, [key]: obj[key]};
        }
    }
    return result;
}


/*
    Creates an object composed of the object properties predicate doesn't return truthy for.
    The predicate is invoked with two arguments: (value, key). */


function omitBy(obj, predicate) {
    let result = {};
    for (const key in obj) {
        if(!predicate(obj[key])) {
            result = {...result, [key]: obj[key]}
        }
    }
    return result;
}


/*
    Creates an object composed of the own and inherited enumerable property paths of object that are not omitted. */


function omit(obj, paths) {
    let result = {...obj};
    for (let i = 0; i < paths.length; i += 1) {
        let key = paths[i];
        delete result[key];
    }
    return result;
}


module.exports = {
    merge,
    pick,
    pickBy,
    omitBy,
    omit,
};