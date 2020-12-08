define(['./mutiply'], function(multiplyModule) {
    console.log('load square module')
    return {
        square: function(num) {
            return multiplyModule.multiply(num, num)
        }
    }
})