define(function(require, exports, module) {

	console.log('load add module')

    var add = function(x, y) {　
        return x + y;
    };

    module.exports = {　　　　　　
        add: add
    };

});