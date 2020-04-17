import { searchPage, countPage, product } from './action';
import { combineReducers } from 'redux';
/*reducer*/

const pageInitialState ={
    keyword : '',
    pageNumbers : 1,
    category : 0,
    family : 0,
    show : true,
};

// const searchInitialState ={
//     keyword : '하이',
// };



function pageReducer(state = pageInitialState, action) {
    switch(action.type) {
        case countPage.convert :
            return convertPage(state, action.payload);
        case searchPage.search : 
            return searchKeyword(state, action.payload);
        case product.category :
            return checkCategoryId(state, action.payload);
        case product.family :
            return checkFamily(state, action.payload);
        case product.show :
            return changeShow(state);
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
        pageNumbers : 1,
        family : 0
    }
}

function checkCategoryId(state, category_c) {
    return {
        ...state,
        category : category_c,
        keyword : '',
        family : 0
    }
}

function checkFamily(state, family_c) {
    return {
        ...state,
        family : family_c,
        keyword : ''
    }
}

function changeShow(state) {
    return {
        ...state,
        show : !state.show,
        pageNumbers : 1
    }
}

// const reducer = combineReducers({
//     pageReducer,
//     searchReducer
// });


export default pageReducer;