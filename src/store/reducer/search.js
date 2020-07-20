import { searchPage, pagination } from '../../action'


const InitialState ={
    keyword : '',
    keywordC : '',
    keywordP : '',
    keywordS : '',
    keywordM : '',
    pageNumbers : 1,
};


export default function searchReducer(state = InitialState, action) {
    switch(action.type) {
        case searchPage.search : 
            return searchKeyword(state, action.payload);
        case searchPage.searchC : 
            return searchKeywordC(state, action.payload);
        case searchPage.searchP : 
            return searchKeywordP(state, action.payload);
        case searchPage.searchS : 
            return searchKeywordS(state, action.payload);
        case searchPage.searchM : 
            return searchKeywordM(state, action.payload);
        case pagination.convert :
            return convertPage(state, action.payload);
        default : 
            return state;
    }
}

function convertPage(state, next_page) {
    console.warn(next_page)
    return {
        ...state ,
        pageNumbers : next_page
    }
}


function searchKeyword(state, keyword_) {
    return {
        ...state,
        keyword : keyword_,
        pageNumbers : 1,
        family : 0
    }
}

function searchKeywordC(state, keyword_c) {
    return {
        ...state,
        keywordC : keyword_c,
        pageNumbers : 1,
        family : 0
    }
}

function searchKeywordP(state, keyword_p) {
    return {
        ...state,
        keywordP : keyword_p,
        pageNumbers : 1,
        family : 0
    }
}

function searchKeywordS(state, keyword_s) {
    return {
        ...state,
        keywordS : keyword_s,
        pageNumbers : 1,
        family : 0
    }
}

function searchKeywordM(state, keyword_m) {
    return {
        ...state,
        keywordM : keyword_m,
        pageNumbers : 1,
        family : 0
    }
}
