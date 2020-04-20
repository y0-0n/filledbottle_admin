import {combineReducers} from 'redux'
import search from './search'
import product from './product'
import stock from './stock'
/*reducer*/

const reducer = combineReducers({
    search,
    product,
    stock
});

export default reducer;