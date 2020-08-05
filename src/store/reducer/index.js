import {combineReducers} from 'redux'
import search from './search'
import product from './product'
import stock from './stock'
import pagination from './pagination'
/*reducer*/

const reducer = combineReducers({
    search,
    product,
    stock,
    pagination
});

export default reducer;