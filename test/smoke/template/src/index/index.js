import './index.scss'
console.log('hahah')
import {common} from '../../common/index';
import './helloworld'
common()
let add = (a, b) => {
    console.log(a + b)
}
// debugger
add(2, 3);

if (module.hot) {
    module.hot.accept()
}