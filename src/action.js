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

const family = 'family'

function checkFamily(e) {
    return {
        type : family,
        payload : e,
    }
}

const show = 'show'

function changeShow() {
    return {
        type : show
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
    category,
    family,
    show
}

const pageFunction = {
    clickConvertPage,
}

const searchFunction = {
    searchKeyword
}

const productFunction = {
    checkCategoryId,
    checkFamily,
    changeShow
}

export { countPage, searchPage, product }
export { searchFunction, pageFunction, productFunction }