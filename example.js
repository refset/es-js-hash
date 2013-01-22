var hash = require('./es-hash.js');

/*
 * Create two objects with identical content in a different order and output their hashes
 */
var obj1 = { bla: 'blub', blub: 'bla' },
    obj2 = { blub: 'bla', bla: 'blub' };

// Compare the hashes
console.log('# Comparing two object with identical content but a different order of their attributes');
console.log('Obj1 - ' + hash(obj1));
console.log('Obj2 - ' + hash(obj2));
console.log('Obj1 md5 - ' + hash(obj1, 'md5'));
console.log('Obj2 md5 - ' + hash(obj2, 'md5'));

/*
 * Save data in an object with an object as a key
 */
console.log('# Using objects as array keys');

// Create object
var store = {};

// Result before overriding Object.toString()
store[{ foo: 'bar', bar: 'foo' }] = 'bla';

console.log('  Result before overriding Object.toString() ');
console.log(store[{ foo: 'bar', bar: 'foo' }]);
console.log(store[{ bar: 'foo', foo: 'bar' }]);
console.log(store[{}]);

Object.prototype.toString = function () {
    return '[object Object #'+hash(this)+']';
};

// Result after overriding Object.toString()
store[{ foo: 'bar', bar: 'foo' }] = 'bla';

console.log('  Result after overriding Object.toString() ');
console.log(store[{ foo: 'bar', bar: 'foo' }]);
console.log(store[{ bar: 'foo', foo: 'bar' }]);
console.log(store[{}]);