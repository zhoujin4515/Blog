define(function() {
    
    console.log('load add module')

    var add = function(x, y) {
        return x + y
    }

    return {
        add: add
    }
})