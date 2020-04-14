const next = 'next' ;
const prev = 'prev' ;
const convert = 'convert' ;

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

const order = {
    next,
    prev,
    convert
}

const orderFunction = {
    clickNextPage,
    clickPrevPage,
    clickConvertPage
}

export { order }
export { orderFunction }