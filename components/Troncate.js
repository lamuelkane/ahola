export const troncate = (string, length) => {
    if(string.length < length ) {
        return string
    }
    let newstring = string.substring(0, length) + '...'
    return newstring
 }