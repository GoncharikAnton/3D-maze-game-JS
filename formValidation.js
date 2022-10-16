export function formValidation(form, nameInp, rowInp, colInp){
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
            showErrorNumInp(colInp,'colsError');
            validated = false;
        }
        return validated;
}


export function showErrorName(nameInp, inpTitle) {
    const nameError = document.querySelector(`#${inpTitle}`)
    if (nameInp.validity.valueMissing) {
        nameError.textContent = 'You need to enter a name.';
    } else if (nameInp.validity.patternMismatch) {
        nameError.textContent = 'Entered characters need to be alphabetical only';
    }
    nameError.className = 'error';
}

export function showErrorNumInp(inp, inpTitle) {
    const inpTitleError = document.querySelector(`#${inpTitle}`); // row or col
    if (inp.validity.valueMissing) {
        inpTitleError.textContent = 'You need to enter a positive number.';
    } else if (inp.validity.patternMismatch){
        inpTitleError.textContent = 'Number must to be positive.';
    }
    inpTitleError.className = 'error';
}

export function showErrorLoad(nameInp, inpTitle) {
    const nameError = document.querySelector(`#${inpTitle}`)
    nameError.textContent = 'There is no game with this name...'
    nameError.className = 'error';
}

export function clearErrorMessages(){
    const errorMessages = document.querySelectorAll('.error');
    for (const errorMessage of errorMessages) {
        errorMessage.textContent = '';
        errorMessage.classList.remove('error');
    }
}

