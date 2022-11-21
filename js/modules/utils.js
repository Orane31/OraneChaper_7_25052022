/**
 * Click outside
 * @param {HTMLElement} 
 * @param {HTMLElement} 
 * @returns {boolean}
 */
 const clickOut = (target, ref) => {
    return !ref.contains(target)
}

/**
 * Splice string 
 * @param {string} str 
 * @param {number} index 
 * @returns 
 */
const spliceString = (str, index) => {
    let strSliced = str.slice(0, index);
    let strSplited = strSliced.split(' ');

    return strSliced.slice(0, (index - strSplited[strSplited.length - 1].length) - 1) + "...";
}

const utils = {
    clickOut,
    spliceString
}

export default utils;