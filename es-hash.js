(function () {
    var djb2 = function (str) {
        var hash = 5381;
        for (i = 0; i < str.length; i++) {
            char = str.charCodeAt(i);
            hash = ((hash << 5) + hash) + char; /* hash * 33 + c */
        }
        return hash;
    };

    module.exports = function (object, algorithm) {
        var hashs = [];

        for (var key in object) {
            // Hash objects recursiv
            if (typeof(object[key]) == "object") {
                object[key] = this(object[key]);
            }

            // Add hash
            hashs.push(key + object[key] + key.length + object[key].length);
        }

        // Sort hash by keys
        hashs.sort();

        return (typeof(algorithm) == "undefined" || algorithm == 'djb2')
            ? djb2(hashs.join('|')) : require('node_hash')[algorithm](hashs.join('|'));
    };
})();