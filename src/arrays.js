// helper functions

function slice(array, start, end) {
    let slicedArr = [];
    if (end > array.length || end === undefined)
    end = array.length;
    for (let i = start; i < end; i += 1) {
        slicedArr = [...slicedArr, array[i]];
    }
    return slicedArr;
}

function arrFromObj(obj) {
    let arrFrom = [];
    for (const key in obj) {
        arrFrom = [...arrFrom, obj[key]];
    }
    return arrFrom;
}



/* 
    Creates an array of elements split into groups the length of size. 
    If array can't be split evenly, the final chunk will be the remaining elements. */

function chunk(array, size = 1) {
    let result = [];
    if (array.length === 0 || size === 0) {
        return result;
    }
    for (let i = 0; i < array.length; i += size) {
        const chunk = slice(array, i, i + size)
        result = [...result, chunk];
    }
    return result;
}


/* 
    Returns the new array with falsey values removed from the specified array. */

function compact(array) {
    let result = [];
    for (let i = 0; i < array.length; i += 1) {
        if (array[i]) {
            result = [...result, array[i]];
        }
    }
    return result;
  }

  
/* 
    Returns the slice of array with n elements dropped from the start of the specified array. */
  
function drop(array, n = 1) {
    return slice(array, n);
}


/* 
    Returns the slice of array with n elements taken from the start of the specified array. */

function take(array, n = 1) {
    return slice(array, 0, n);
}


/* 
    Creates a slice of array excluding elements dropped from the beginning. 
    Elements are dropped until predicate returns falsey. */

function dropWhile(array, predicate) {
    let firstFalsyIndex;
    for (let i = 0; i < array.length; i += 1) {
        if (!predicate(array[i])) {
            firstFalsyIndex = i;
            break;
        }
    }
    return slice(array, firstFalsyIndex);
}


/* 
    Iterates over elements of collection, returning an array of all elements predicate returns truthy for.
    The predicate is invoked with three arguments: (value, index|key, collection). */
    

function filter(collection, predicate) {
    let result = [];
    if (typeof collection === 'object') {
        const arrFrom = arrFromObj(collection);
        for (let i = 0; i < arrFrom.length; i += 1) {
            if (predicate(arrFrom[i])) {
                result = [...result, arrFrom[i]];
            }
        }
    }
    if (typeof collection === 'string') {
        for (let i = 0; i < collection.length; i += 1) {
            if (predicate(collection[i])) {
                result = [...result, collection[i]];
            }
        }
    }
    return result;
}


/* 
    Iterates over elements of collection, returning the first element predicate returns truthy for. */

function find(collection, predicate, fromIndex = 0) {
    let result;
    if (typeof collection === 'object') {
        const arrFrom = arrFromObj(collection);
        for (let i = fromIndex; i < arrFrom.length; i += 1) {
            if (predicate(arrFrom[i])) {
                result = arrFrom[i];
                break;
            }
        }
    }
    if (typeof collection === 'string') {
        for (let i = fromIndex; i < collection.length; i += 1) {
            if (predicate(collection[i])) {
                result = collection[i];
            }
        }
    }
    return result;
}


/* 
    Checks if value is in collection. If collection is a string, it's checked for a substring of value
    If fromIndex is negative, it's used as the offset from the end of collection. */

function includes(collection, value, fromIndex = 0) {
    if (fromIndex < 0) {
        fromIndex = collection.length - Math.abs(fromIndex);
    }
    if (typeof collection === 'object') {
        const arrFrom = arrFromObj(collection);
        for (let i = fromIndex; i < arrFrom.length; i += 1) {
            if (arrFrom[i] === value) {
                return true;
            }
        }
    }
    if (typeof collection === 'string') {
        if (collection.indexOf(value, fromIndex) !== -1)
        return true;
    }
   return false;
}


/* 
    Creates an array of values by running each element in collection thru iteratee. */

function map(collection, iteratee) {
    let result = [];
    if (typeof collection === 'object') {
        const arrFrom = arrFromObj(collection);
        for (let i = 0; i < arrFrom.length; i += 1) {
            result = [...result, iteratee(arrFrom[i])];
        }
    }
    if (typeof collection === 'string') {
        for (let i = 0; i < collection.length; i += 1) {
            result = [...result, iteratee(collection[i])];
        }
    }
    return result;
}


/* 
    Creates an array of grouped elements, the first of which contains the first elements of the given arrays,
    the second of which contains the second elements of the given arrays, and so on. */

function zip(...arrays) {
    let result = chunk(arrays[0]);
    for (let i = 1; i < arrays.length; i += 1) {
        for (let j = 0; j < arrays[0].length; j += 1) {
            result[j] = [...result[j], arrays[i][j]];
        }
    }
    return result;
}




module.exports = {
    chunk,
    compact,
    drop,
    take,
    dropWhile,
    filter,
    find,
    includes,
    map,
    zip,
};

