
import { product, searchPage, pagination } from '../../action';

const InitialState ={
    category : 0,
    family : 0,
    show : true,
    keyword : '',
    pageNumbers : 1,
    stateP: 0,
};

export default function pageReducer(state = InitialState, action) {
    switch(action.type) {
        case searchPage.search :
            return searchKeyword(state, action.payload);
        case pagination.convert :
            return convertPage(state, action.payload);
        case product.category :
            return checkCategoryId(state, action.payload);
        case product.family :
            return checkFamily(state, action.payload);
        case product.show :
            return changeShow(state);
        case product.stateP :
            return changeStateP(state, action.payload);
        default : 
            return state;
    }
}

/*reducer function */

function checkCategoryId(state, category_c) {
    return {
        ...state,
        category : category_c,
        keyword : '',
        family : 0
    }
}

function checkFamily(state, family_c) {
    console.log("checkFamily:" , family_c)
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

function changeStateP(state, state_product) {
    console.log("changeStateP",state_product)
    return {
        ...state,
        stateP : state_product,
        pageNumbers : 1
    }
}

function searchKeyword(state, keyword_s) {
    console.log(keyword_s)
    return {
        ...state,
        keyword : keyword_s,
        pageNumbers : 1,
        family : 0
    }
}

function convertPage(state, next_page) {
    console.warn(next_page)
    return {
        ...state,
        family: 0,
        pageNumbers : next_page
    }
}