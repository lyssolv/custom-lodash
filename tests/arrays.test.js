const methods = require('../src/arrays');

test('chunk should return new array of chunks with length of size', () => {
    expect(methods.chunk([1, 2, 3, 4], 2)).toStrictEqual([[1, 2], [3, 4]]);
    expect(methods.chunk([1, 2, 3, 4], 3)).toStrictEqual([[1, 2, 3], [4]]);
    expect(methods.chunk([1, 2, 3, 4], 0)).toStrictEqual([]);
    expect(methods.chunk([1, 2, 3, 4])).toStrictEqual([[1], [2], [3], [4]]);
    expect(methods.chunk([], 2)).toStrictEqual([]);
});


test('compact should create an array with all falsey values removed', () => {
    expect(methods.compact([1, 2, false, 3, '', 4])).toStrictEqual([1, 2, 3, 4]);
    expect(methods.compact([0, null, NaN])).toStrictEqual([]);
    expect(methods.compact([1, 2, 3, 4])).toStrictEqual([1, 2, 3, 4]);
});


test('drop should create a slice of array with n elements dropped from the beginning', () => {
    expect(methods.drop([1, 2, 3, 4], 2)).toStrictEqual([3, 4]);
    expect(methods.drop(['b', 'e', 5, 'c', 4], 3)).toStrictEqual(['c', 4]);
    expect(methods.drop([1, 2, 3, 4], 0)).toStrictEqual([1, 2, 3, 4]);
    expect(methods.drop([1, 2, 3, 4], 5)).toStrictEqual([]);
    expect(methods.drop([1, 2, 3, 4])).toStrictEqual([2, 3, 4]);
});

test('take should create a slice of array with n elements taken from the beginning', () => {
    expect(methods.take([1, 2, 3, 4], 2)).toStrictEqual([1, 2]);
    expect(methods.take(['b', 'e', 5, 'c', 4], 3)).toStrictEqual(['b', 'e', 5]);
    expect(methods.take([1, 2, 3, 4], 0)).toStrictEqual([]);
    expect(methods.take([1, 2, 3, 4], 5)).toStrictEqual([1, 2, 3, 4]);
    expect(methods.take([1, 2, 3, 4])).toStrictEqual([1]);
});

test('dropWhile should return the slice of array of remaining elements when predicate returns falsey', () => {
    expect(methods.dropWhile([
    { 'user': 'barney', 'active': false },
    { 'user': 'fred', 'active': false },
    { 'user': 'pebbles', 'active': true }
    ], (user) => !user.active)).toStrictEqual([ { user: 'pebbles', active: true } ]);
    expect(methods.dropWhile([4, 3, 1, 2], (n) => n > 1)).toStrictEqual([1, 2]);
    expect(methods.dropWhile([4, 3, 1, 2], (n) => n > 0)).toStrictEqual([]);
    expect(methods.dropWhile('aabcda', (n) => n === 'a')).toStrictEqual(['b', 'c', 'd', 'a']);
    expect(methods.dropWhile('aabcda', (n) => n !== 'a')).toStrictEqual(['a', 'a', 'b', 'c', 'd', 'a']);
});


test('filter should return the new filtered array of all elements predicate returns truthy for', () => {
    expect(methods.filter([
    { 'user': 'barney', 'active': false },
    { 'user': 'fred', 'active': false },
    { 'user': 'pebbles', 'active': true }
    ], (user) => user.active)).toStrictEqual([ { user: 'pebbles', active: true } ]);
    expect(methods.filter([1, 2, 3, 4], (n) => n > 1)).toStrictEqual([2, 3, 4]);
    expect(methods.filter(['a', '', 4, false, 6], (n) => !n)).toStrictEqual(['', false]);
    expect(methods.filter({a: 4, b: 5, c: 7}, (n) => n % 2)).toStrictEqual([5, 7]);
    expect(methods.filter('abcdb', (n) => n === 'b')).toStrictEqual(['b', 'b']);
});


test('find should return the first element predicate returns truthy for, else undefined', () => {
    expect(methods.find([
    { 'user': 'barney', 'age': 45 },
    { 'user': 'fred', 'age': 40 },
    { 'user': 'pebbles', 'age': 15 }
    ], (user) => user.age < 40)).toStrictEqual( { user: 'pebbles', age: 15 } );
    expect(methods.find([1, 2, 3, 4], (n) => n > 1)).toStrictEqual(2);
    expect(methods.find([1, 2, 3, 4], (n) => n > 1, 2)).toStrictEqual(3);
    expect(methods.find(['', false, 'a', 4, 6], (n) => n)).toStrictEqual('a');
    expect(methods.find({a: 4, b: 5, c: 7}, (n) => n % 2)).toStrictEqual(5);
    expect(methods.find('abcdb', (n) => n === 'b')).toStrictEqual('b');
    expect(methods.find('abcde', (n) => n === 'b', 2)).toStrictEqual(undefined);
});


test('includes should return true if value is found in collection, else false', () => {
    expect(methods.includes([1, 2, 3, 4], 1)).toStrictEqual(true);
    expect(methods.includes([1, 2, 3, 4], 1, 2)).toStrictEqual(false);
    expect(methods.includes('abcd', 'a')).toStrictEqual(true);
    expect(methods.includes('abcd', 'b', -2)).toStrictEqual(false);
    expect(methods.includes([1, 2, 3, 4], 3, -3)).toStrictEqual(true);
    expect(methods.includes({ 'a': 1, 'b': 2 }, 1)).toStrictEqual(true);
    expect(methods.includes({ 'a': 1, 'b': 2 }, 'b')).toStrictEqual(false);
});


test('map should return the new mapped array', () => {
    expect(methods.map([
        { 'name': 'barney' },
        { 'name': 'fred' },
        { 'name': 'sam', }
        ], (user) => user.name)).toStrictEqual(['barney', 'fred', 'sam']);
    expect(methods.map([1, 2, 3, 4], (n) => n * 2)).toStrictEqual([2, 4, 6, 8]);
    expect(methods.map([4, 8], (n) => n * n)).toStrictEqual([16, 64]);
    expect(methods.map({a: 4, b: 5}, (n) => n * 2)).toStrictEqual([8, 10]);
    expect(methods.map('abcd', (n) => n.toUpperCase())).toStrictEqual(['A', 'B', 'C', 'D']);
});


test('zip should returm the new array of grouped elements from specified arrays', () => {
    expect(methods.zip(['a', 'b'], [1, 2], [true, false])).toStrictEqual([['a', 1, true], ['b', 2, false]]);
    expect(methods.zip(['a', 1], ['b', 2])).toStrictEqual([['a', 'b'], [1, 2]]);
    expect(methods.zip(['a', 'b', 'c'], [1, 2, 3], ['d'])).toStrictEqual([['a', 1, 'd'], ['b', 2, undefined], ['c', 3, undefined]]);
});
