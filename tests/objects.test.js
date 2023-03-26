const methods = require('../src/objects');


test('merge should return the merged object', () => {
    expect(methods.merge({a: 1, b: 2},{c: 3, d: 4})).toStrictEqual({a: 1, b: 2, c: 3, d: 4});
    expect(methods.merge({a: 1}, {c: 3}, {b: 2}, {d: 4})).toStrictEqual({a: 1, c: 3, b: 2, d: 4});
    expect(methods.merge({a: 1, b: 3}, {a: 3, c: 1}, {b: 2})).toStrictEqual({a: 3, b: 2, c: 1});
    expect(methods.merge({a: 1, b: 3}, {c: undefined, d: 1})).toStrictEqual({a: 1, b: 3, d: 1});
    // expect(methods.merge({a: [{ b: 2 }, { d: 4 }]}, {a: [{ c: 3 }, { e: 5 }]})).toStrictEqual({ a: [{ b: 2, c: 3 }, { d: 4, e: 5 }] });
});


test('pick should return a new object of the picked properties', () => {
    expect(methods.pick({a: 1, b: 2, c: 3, d: 4}, ['a', 'c'])).toStrictEqual({a: 1, c: 3});
    expect(methods.pick({a: 1, b: 2, c: 3, d: 4}, ['d'])).toStrictEqual({d: 4});
    expect(methods.pick({a: 1, b: 2, c: 3, d: 4}, 'a')).toStrictEqual({a: 1});
    expect(methods.pick({a: 1, b: 2, c: 3, d: 4}, ['e'])).toStrictEqual({});
});


test('pickBy should return a new object from properties that predicate returns truthy for', () => {
    expect(methods.pickBy({a: 1, b: 2, c: 3, d: 4}, (n) => n > 2)).toStrictEqual({c: 3, d: 4});
    expect(methods.pickBy({a: 1, b: 2, c: 3, d: 4}, (n) => n === 0)).toStrictEqual({});
    expect(methods.pickBy({a: 'a', b: 'b', c: 'c'}, (n) => n !== 'b')).toStrictEqual({a: 'a', c: 'c'});
    expect(methods.pickBy({a: 'a', b: 2, c: '3'}, (n) => typeof n === 'number')).toStrictEqual({b: 2});
});


test('omitBy should return a new object from properties that predicate doesn\'t return truthy for', () => {
    expect(methods.omitBy({a: 1, b: 2, c: 3, d: 4}, (n) => n > 2)).toStrictEqual({a: 1, b: 2});
    expect(methods.omitBy({a: 1, b: 2, c: 3, d: 4}, (n) => n > 0)).toStrictEqual({});
    expect(methods.omitBy({a: 'a', b: 'b', c: 'c'}, (n) => n !== 'b')).toStrictEqual({b: 'b'});
    expect(methods.omitBy({a: 'a', b: 2, c: '3'}, (n) => typeof n === 'number')).toStrictEqual({a: 'a', c: '3'});
});


test('omit should return a new object of the omitted properties', () => {
    expect(methods.omit({a: 1, b: 2, c: 3, d: 4}, ['a', 'c', 'd'])).toStrictEqual({b: 2});
    expect(methods.omit({a: 1, b: 2, c: 3, d: 4}, ['d'])).toStrictEqual({a: 1, b: 2, c: 3});
    expect(methods.omit({a: 1, b: 2, c: 3}, ['d'])).toStrictEqual({a: 1, b: 2, c: 3});
    expect(methods.omit({a: 1, b: 2, c: 3}, 'a')).toStrictEqual({b: 2, c: 3});
});

