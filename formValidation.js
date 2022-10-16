/**
 * Checks the input of user for validity and if it is valid returns positive result, in worst case
 * function returns fail result and renders an error message to the user.
 * @param form
 * @param nameInp
 * @param rowInp
 * @param colInp
 * @returns {boolean}
 */
export function formValidation(form, nameInp, rowInp, colInp) {
    let validated = true;
    if (!nameInp.checkValidity()) {
        showErrorName(nameInp, 'nameError');
        validated = false;
    }
    if (!rowInp.checkValidity()) {
        showErrorNumInp(rowInp, 'rowsError');
        validated = false;
    }
    if (!colInp.checkValidity()) {
        showErrorNumInp(colInp, 'colsError');
        validated = false;
    }
    return validated;
}

/**
 * Renders an error message to the user.
 * @param nameInp
 * @param inpTitle
 */
export function showErrorName(nameInp, inpTitle) {
    const nameError = document.querySelector(`#${inpTitle}`)
    if (nameInp.validity.valueMissing) {
        nameError.textContent = 'You need to enter a name.';
    } else if (nameInp.validity.patternMismatch) {
        nameError.textContent = 'Entered characters need to be alphabetical only';
    }
    nameError.className = 'error';
}

/**
 * Renders an error message to the user.
 * @param i
 * @param inpTitle
 */
export function showErrorNumInp(inp, inpTitle) {
    const inpTitleError = document.querySelector(`#${inpTitle}`); // row or col
    if (inp.validity.valueMissing) {
        inpTitleError.textContent = 'You need to enter a positive number.';
    } else {
        inpTitleError.textContent = 'Number must to be positive and more than 2.';
    }
    inpTitleError.className = 'error';
}

/**
 * Renders an error message to the user.
 * @param nameInp
 * @param inpTitle
 */
export function showErrorLoad(nameInp, inpTitle) {
    const nameError = document.querySelector(`#${inpTitle}`)
    nameError.textContent = 'There is no game with this name...'
    nameError.className = 'error';
}

/**
 * Renders an error message to the user.
 */
export function clearErrorMessages() {
    const errorMessages = document.querySelectorAll('.error');
    for (const errorMessage of errorMessages) {
        errorMessage.textContent = '';
        errorMessage.classList.remove('error');
    }
}

