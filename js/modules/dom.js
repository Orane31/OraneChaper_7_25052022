/**
 * @param {HTMLElement} element 
 * @param {HTMLElement} target 
 */
 const append = (element, target) => {
    target.appendChild(element);
}

/**
 * @param {HTMLElement} element 
 * @param {HTMLElement} target 
 */
const replace = (element, target) => {
    target.parentNode.replaceChild(element, target);
}

/**
 * @param {HTMLElement} element 
 * @param {HTMLElement} target 
 */
const insertBefore = (element, target) => {
    target.parentNode.insertBefore(element, target);
}

/**
 * @param {HTMLElement} element 
 * @param {HTMLElement} target 
 */
const insertAfter = (element, target) => {
    target.after(element);
}

/**
 * @param {HTMLElement} element
 */
const remove = (element) => {
    element.parentNode.removeChild(element);
}

const dom = {
    append,
    replace,
    insertBefore,
    insertAfter,
    remove
}

export default dom;