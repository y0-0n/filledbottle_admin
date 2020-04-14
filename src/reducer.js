import { order } from './action'

/*reducer*/

const initialState ={
    pageNumbers : 1,
};



function reducer(state = initialState, action) {
    switch(action.type) {
        case order.next : 
            return nextPage(state);
        case order.prev :
            return prevPage(state);
        case order.convert :
            return convertPage(state, action.payload);
        default : 
            return state;
    }
}

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


export default reducer;