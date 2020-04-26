import { searchPage, pagination } from '../../action'


const InitialState ={
    keyword : '',
    pageNumbers : 1,
};


export default function searchReducer(state = InitialState, action) {
    switch(action.type) {
        case searchPage.search : 
            return searchKeyword(state, action.payload);
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


function searchKeyword(state, keyword_s) {
    return {
        ...state,
        keyword : keyword_s,
        pageNumbers : 1,
        family : 0
    }
}
