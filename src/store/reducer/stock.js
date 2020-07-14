import { stock, product, pagination } from '../../action'


const InitialState ={
    keyword : '',
    pageNumbers : 1,
    familyS : 0,
    plant : 'all'
};


export default function searchReducer(state = InitialState, action) {
    switch(action.type) {
        case stock.familyS :
            return checkFamilyS(state, action.payload);
        case pagination.convert :
            return convertPage(state, action.payload);
        case stock.plant :
            return checkPlant(state, action.payload);
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

function checkFamilyS(state, family_c) {
    return {
        ...state,
        familyS : family_c,
    }
}

function checkPlant(state, plant_c) {
    return {
        ...state,
        plant : plant_c,
        family : 0
    }
}