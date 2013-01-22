var hash = require('./es-hash.js');

module.exports = {
    testHash: function (test) {
        // Create two objects with identical content in a different order
        var obj1 = { bla: 'blub', blub: 'bla' },
            obj2 = { blub: 'bla', bla: 'blub' };

        // Compare the hashes
        test.equals(
            hash(obj1) == hash(obj2),
            true,
            "Hashes of two objects with identical content but different order were different."
        );

        test.done();
    },
    testMd5Hash: function (test) {
        // Create two objects with identical content in a different order
        var obj1 = { bla: 'blub', blub: 'bla' },
            obj2 = { blub: 'bla', bla: 'blub' };

        // Compare the hashes
        test.equals(
            hash(obj1, 'md5') == hash(obj2, 'md5'),
            true,
            "Hashes of two objects with identical content but different order were different."
        );

        test.done();
    }
};