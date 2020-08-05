import { pagination } from '../../action'


const InitialState ={
    pageNumbers : 1,
    pageNumbersP : 1,
    pageNumbersC : 1,
    pageNumbersS : 1,
    pageNumbersM : 1,
};


export default function pageReducer(state = InitialState, action) {
    switch(action.type) {
        case pagination.convert : 
            return convertPage(state, action.payload);
        case pagination.convertC : 
            return convertPageC(state, action.payload);
        case pagination.convertP : 
            return convertPageP(state, action.payload);
        case pagination.convertS : 
            return convertPageS(state, action.payload);
        case pagination.convertM : 
            return convertPageM(state, action.payload);
        default : 
            return state;
    }
}

function convertPage(state, next_page) {
    return {
        ...state ,
        pageNumbers : next_page
    }
}

function convertPageP(state, next_page) {
    return {
        ...state ,
        pageNumbersP : next_page
    }
}

function convertPageC(state, next_page) {
    return {
        ...state ,
        pageNumbersC : next_page
    }
}

function convertPageS(state, next_page) {
    return {
        ...state ,
        pageNumbersS : next_page
    }
}

function convertPageM(state, next_page) {
    return {
        ...state ,
        pageNumbersM : next_page
    }
}
