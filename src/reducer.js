import { order } from './action';
import { combineReducers } from 'redux';

/*reducer*/

const pageInitialState ={
    keyword : '',
    pageNumbers : 1,
};

// const searchInitialState ={
//     keyword : '하이',
// };



function pageReducer(state = pageInitialState, action) {
    switch(action.type) {
        case order.next : 
            return nextPage(state);
        case order.prev :
            return prevPage(state);
        case order.convert :
            return convertPage(state, action.payload);
        case order.search : 
            return searchKeyword(state, action.payload);
        default : 
            return state;
    }
}

// function searchReducer(state = searchInitialState, action) {
//     switch(action.type) {
//         case order.search : 
//             return searchKeyword(state, action.payload);
//         default : 
//             return state;
//     }
// }

/*reducer function */

function nextPage(state) {
    return {
        ...state,
        pageNumbers : state.pageNumbers + 1
    }
}

function prevPage(state) {
    if(state.page > 1) {
        return {
            ...state,
            pageNumbers : state.pageNumbers -1
        }
    }
}

function convertPage(state, next_page) {
    console.warn(next_page)
    return {
        ...state ,
        pageNumbers : next_page
    }
}

function searchKeyword(state, keyword_s) {
    return {
        ...state,
        keyword : keyword_s,
        pageNumbers : 1
    }
}

// const reducer = combineReducers({
//     pageReducer,
//     searchReducer
// });


export default pageReducer;