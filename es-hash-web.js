var algorithms = {
    djb2: function (str) {
        var hash = 5381,
            char;
        for (i = 0; i < str.length; i++) {
            char = str.charCodeAt(i);
            hash = ((hash << 5) + hash) + char; /* hash * 33 + c */
        }
        return hash;
    },
    sdbm: function(str){
        var hash = 0;
        for (i = 0; i < str.length; i++) {
            char = str.charCodeAt(i);
            hash = char + (hash << 6) + (hash << 16) - hash;
        }
        return hash;
    },
    javaHashCode: function(str){
        var hash = 0,
            char;
        if (str.length == 0) return hash;
        for (i = 0; i < str.length; i++) {
            char = str.charCodeAt(i);
            hash = ((hash<<5)-hash)+char;
            hash = hash & hash; // Convert to 32bit integer
        }
        return hash;
    },
    crc32: function (str) {
        //str = String(str);
        var c=0, i=0, j=0;
        var polynomial = arguments.length < 2 ? 0x04C11DB7 : arguments[1],
            initialValue = arguments.length < 3 ? 0xFFFFFFFF : arguments[2],
            finalXORValue = arguments.length < 4 ? 0xFFFFFFFF : arguments[3],
            crc = initialValue,
            table = [], i, j, c;

        function reverse(x, n) {
            var b = 0;
            while (n) {
                b = b * 2 + x % 2;
                x /= 2;
                x -= x % 1;
                n--;
            }
            return b;
        }

        var range = 255, c=0;
        for (i = 0; i < str.length; i++){
            c = str.charCodeAt(i);
            if(c>range){ range=c; }
        }

        for (i = range; i >= 0; i--) {
            c = reverse(i, 32);

            for (j = 0; j < 8; j++) {
                c = ((c * 2) ^ (((c >>> 31) % 2) * polynomial)) >>> 0;
            }

            table[i] = reverse(c, 32);
        }

        for (i = 0; i < str.length; i++) {
            c = str.charCodeAt(i);
            if (c > range) {
                throw new RangeError();
            }
            j = (crc % 256) ^ c;
            crc = ((crc / 256) ^ table[j]) >>> 0;
        }

        return (crc ^ finalXORValue) >>> 0;
    }
};

// @exports
module.exports = function (object, algorithm) {
    var hashs = [];

    for (var key in object) {
        // Hash objects recursiv
        var val = object[key];
        if (typeof(val) == "object") {
            val = module.exports(object[key]);
        }

        // Add hash
        hashs.push(key + val + key.length + (typeof(val) == "string" ? val.length : 0));
    }

    // Sort hash by keys
    hashs.sort();

    // Parse algorithm
    if (typeof(algorithm) == "undefined")
        algorithm = 'djb2';

    // Test that algorithm is defined
    // <debug>
    if (typeof(algorithms[algorithm]) == "undefined") {
        throw "Undefined algorithm " + algorithm;
    }
    // </debug>

    return algorithms[algorithm](hashs.join('|'));
};