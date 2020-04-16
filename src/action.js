const next = 'next' ;
const prev = 'prev' ;
const convert = 'convert' ;
const search = 'search'

function clickNextPage() {
    return {
        type : next,
    }
}

function clickPrevPage() {
    return {
        type : prev,
    }
}

function clickConvertPage(e) {
    return {
        type : convert,
        payload : e
    }
}

function searchKeyword(e) {
    return {
        type : search,
        payload : e
    }
}

const order = {
    next,
    prev,
    convert,
    search
}

const orderFunction = {
    clickNextPage,
    clickPrevPage,
    clickConvertPage,
    searchKeyword
}

export { order }
export { orderFunction }