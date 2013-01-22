This is a small module to create hashes from simple objects. The ECMA Standart defines Javascript Objects as unordered,
so you can't just iterate over the object and save a hash for each key value pair, you have to sort it. This module
does that for you so you can easily compare objects that have identical content but are ordered differently.

# Supported Hashing algorithms
djb2, md5, sha1, sha256, sha512, ripemd160

Default: djb2

# Installation
Node-JS:
```
$ npm install es-hash
```

Browser:
You can easily adapt this package for usage in the browser (e.q. RequireJS Optimizer, Cajon, ...). Keep in mind
that all hashing algorithms except of djb2 depend on node_hash which itself uses nodes crypto library, so you can
only use djb2 in the browser or implement other algorithms.

# Example

``` javascript
var hash = require('es-hash');

// Create two objects with identical content in a different order
var obj1 = { bla: 'blub', blub: 'bla' },
    obj2 = { blub: 'bla', bla: 'blub' };

// Output hashes
console.log('Obj1 - ' + hash(obj1));
console.log('Obj2 - ' + hash(obj2));

// Output hashes as md5
console.log('Obj1 - ' + hash(obj1, 'md5'));
console.log('Obj2 - ' + hash(obj2, 'md5'));
```

# Using Objects as Array keys
You may face the problem that array keys in javascript are always strings. So if you use an object as key, the resulting
key will be [object Object]. Thats not what we intended to do, as you can see in the following example.

``` javascript
var foo = {};

foo[{bar: 'foo'}] = 'foo';

/*
 * Expected output:
 *  foo
 *  undefined
 *
 * Actual output:
 *  foo
 *  foo
 */
console.log(foo[{bar: 'foo'}]);
console.log(foo[{}]);
```

You can still use the same syntax if you just override Object.toString and return a hash for the current object.

``` javascript
var hash = require('es-hash');

// Save data in an object with an object as a key
Object.prototype.toString = function () {
    return '[object Object #'+hash(this)+']';
}

var foo = {};

foo[{bar: 'foo'}] = 'foo';

/*
 * Output:
 *  foo
 *  undefined
 */
console.log(foo[{bar: 'foo'}]);
console.log(foo[{}]);
```

# Unit Tests
```
$ nodeunit test.js
```

Expected Ooutput:
```
test.js
✔ testHash
✔ testMd5Hash

OK: 2 assertions (18ms)
``