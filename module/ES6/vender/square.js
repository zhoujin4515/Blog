import { multiplyModule } from './mutiply'
console.log('load square module')

export var square = function(num) {
    return multiplyModule.multiply(num, num)
}

