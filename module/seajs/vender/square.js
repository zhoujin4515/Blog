define(function(require, exports, module) {

	console.log('load square module')

	var multiplyModule = require('./multiply');

    module.exports = {　　　　　　
        square: function(num) {
        	return multiplyModule.multiply(num, num)
        }
    };

});