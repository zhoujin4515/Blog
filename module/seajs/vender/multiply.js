define(function(require, exports, module) {

	console.log('load multiply module')

	var multiply = function(x, y) {　
	    return x * y;
	};

    module.exports = {　　　　　　
        multiply: multiply
    };

});