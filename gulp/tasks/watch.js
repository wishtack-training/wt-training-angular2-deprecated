/**
 *
 * (c) 2013-2015 Wishtack
 *
 * $Id: $
 */

module.exports = function watch(done) {

    var args = {
        bower: false,
        uglify: false,
        watch: true
    };

    var build = require('./lib/build');

    return build(args)(done);

};
