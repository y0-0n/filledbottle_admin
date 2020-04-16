//page
const convert = 'convert' ;


function clickConvertPage(e) {
    return {
        type : convert,
        payload : e
    }
}

//search
const search = 'search'


function searchKeyword(e) {
    return {
        type : search,
        payload : e
    }
}

//product
const category = 'category'

function checkCategoryId(e) {
    return {
        type : category,
        payload : e,
    }
}

//order_export
const countPage = {
    convert,
}

const searchPage = {
    search
}

const product = {
    category
}

const pageFunction = {
    clickConvertPage,
}

const searchFunction = {
    searchKeyword
}

const productFunction = {
    checkCategoryId
}

export { countPage, searchPage, product }
export { searchFunction, pageFunction, productFunction }