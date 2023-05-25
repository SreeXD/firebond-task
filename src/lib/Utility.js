export function color(value) {
    return (value == undefined ? 'grey' : (value ? 'green' : 'red'))
}

export function toString(value) {
    return value == undefined ? 'undefined' : value.toString()
}