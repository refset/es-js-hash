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

Expected output:
```
test.js
✔ testHash
✔ testMd5Hash

OK: 2 assertions (18ms)
```

# License
(The MIT License)

Copyright (C) 2012 Till Ehrengruber

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.