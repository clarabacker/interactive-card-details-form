let main =  document.querySelector('main')
let form = document.querySelector('.form')
let incompleteForm = document.querySelector('.incomplete')
let completeForm = document.querySelector('.complete')
let inputCardName = document.querySelector('#inputCardName')
let inputCardNumber = document.querySelector('#inputCardNumber')
let inputCardMonth = document.querySelector('#inputCardMonth')
let inputCardYear = document.querySelector('#inputCardYear')
let inputCardCvc = document.querySelector('#inputCardCvc')
let btnConfirm = document.querySelector('#btn-confirm')

let textName = document.querySelector('.card-name')
let textNumber = document.querySelector('.card-number')
let textMonth = document.querySelector('.card-month')
let textYear = document.querySelector('.card-year')
let textCvc = document.querySelector('.card-cvc')

let errorMessageName = document.querySelector('.invalid-name')
let errorMessageNumber = document.querySelector('.invalid-number')
let errorMessageDate = document.querySelector('.invalid-date')
let errorMessageCvc = document.querySelector('.invalid-cvc')


// Check if the given string contains only numeric characters
function isNumber(str) {
    let char = str.split("")

    if(char.some( (c) => c.charCodeAt() < 48 || c.charCodeAt() > 57) ) {
        return false
    }

    return true
}

// Check if the given string contains only alphabetic characters
function isAlphabet(str) {
    let char = str.split("")

    if(char.some( (c) => c !== ' ' && (c.charCodeAt() < 65 || (c.charCodeAt() > 90 && c.charCodeAt() < 97) || c.charCodeAt() > 122) ) ) {
        return false
    }

    return true
}


function checkName() { 
    let name = inputCardName.value
    let isValid = false

    // If the input value starts with a space, trimStart() is used to eliminate it
    if (name.startsWith(' ')) {
        name = name.trimStart();
        inputCardName.value = name
    }

    // Prevent the user from typing more than one consecutive space
    name = name.replace(/\s{2,}/g, ' ')
    inputCardName.value = name

    if(!name) {
        errorMessageName.innerHTML = "Can't be blank"
        isValid = false
    }
    else if(!isAlphabet(name)) {
        errorMessageName.innerHTML = 'Wrong format, letters only'
        isValid = false
    }
    else {
        errorMessageName.innerHTML = ''
        isValid = true
    }

    if(!isValid) {
        inputCardName.classList.add("invalid-input")
    }
    else {
        inputCardName.classList.remove("invalid-input")
    }
}

function checkNumber() {
    let number = inputCardNumber.value
    let isValid = false

    // Remove all spaces from the 'number' variable using a regular expression.
    number = number.replace(/\s/g, '');

    // Sets the value of the 'inputCardNumber' element to the modified 'number' without spaces.
    inputCardNumber.value = number;


    if(!number) {
        errorMessageNumber.innerHTML = "Can't be blank"
        isValid = false
    }
    else if(!isNumber(number)) {
        errorMessageNumber.innerHTML = 'Wrong format, numbers only'
        isValid = false
    }
    else if(number.length < inputCardNumber.minLength) {
        errorMessageNumber.innerHTML = 'Enter at least 16 characters'
        isValid = false
    }
    else {
        errorMessageNumber.innerHTML = ''
        isValid = true
    }

    if(!isValid) {
        inputCardNumber.classList.add("invalid-input")
    }
    else {
        inputCardNumber.classList.remove("invalid-input")
    }
}

function checkDate() {
    let month = inputCardMonth.value
    let year = inputCardYear.value
    let monthIsValid = true
    let yearIsValid = true

    // Check month
    if(!month) {
        errorMessageDate.innerHTML = "Can't be blank"
        monthIsValid = false
    }
    else if(month.length < inputCardMonth.minLength) {
        errorMessageDate.innerHTML = 'Enter at least<br>2 characters'
        monthIsValid = false
    }
    else if(!isNumber(month)) {
        monthIsValid = false
    }
    else if(parseInt(month) > 12) {
        errorMessageDate.innerHTML = 'There are 12 months<br>in a year'
        monthIsValid = false
    }
    else if(yearIsValid) {
        errorMessageDate.innerHTML = ''
        monthIsValid = true
    }

    // Check year
    if(!year) {
        errorMessageDate.innerHTML = "Can't be blank"
        yearIsValid = false
    }
    else if(year.length < inputCardYear.minLength) {
        errorMessageDate.innerHTML = 'Enter at least<br>2 characters'
        yearIsValid = false
    }
    else if(!isNumber(year)) {
        yearIsValid = false
    }
    else if(monthIsValid) {
        errorMessageDate.innerHTML = ''
        yearIsValid = true
    }

    if(!monthIsValid) {
        inputCardMonth.classList.add("invalid-input")
    }
    else {
        inputCardMonth.classList.remove("invalid-input")
    }

    if(!yearIsValid) {
        inputCardYear.classList.add("invalid-input")
    }
    else {
        inputCardYear.classList.remove("invalid-input")
    }

    if(monthIsValid && yearIsValid) {
        errorMessageDate.innerHTML = ''
    }
}


function checkCvc() {
    let cvc = inputCardCvc.value

    if(!cvc) {
        errorMessageCvc.innerHTML = "Can't be blank"
        inputCardCvc.classList.add("invalid-input")
    }
    else if(cvc.length < inputCardCvc.minLength) {
        errorMessageCvc.innerHTML = 'Enter at least<br>3 characters'
    }
    else {
        errorMessageCvc.innerHTML = ''
        inputCardCvc.classList.remove("invalid-input")
    }
}

// Restrict input to allow only numeric characters by removing non-numeric characters.
function justNumbers(char) {
    char.value = char.value.replace(/[^0-9]/g, '')
}

form.addEventListener("input", (e) => {
    switch(e.target.id) {
        case 'inputCardName':
            checkName()
            writeName()
            break
        case 'inputCardNumber':
            checkNumber()
            writeNumber()
            break
        case 'inputCardMonth':
            justNumbers(inputCardMonth)
            checkDate()
            writeMonth()
            break
        case 'inputCardYear':
            justNumbers(inputCardYear)
            checkDate()
            writeYear()
            break
        case "inputCardCvc":
            justNumbers(inputCardCvc)
            checkCvc()
            writeCvc()
    }
})

// Functions for real-time update of card details as the form is filled
function writeName() {
    let length = inputCardName.value.length

    if(length == 0) {
        textName.innerHTML= 'Jane Appleseed'
    }
    else {
        textName.innerHTML = inputCardName.value
    }
}
function writeNumber() {
    let length = inputCardNumber.value.length

    if(length == 0) {
        textNumber.innerHTML= '0000 0000 0000 0000'
    }
    else {
        let number = inputCardNumber.value
        textNumber.innerHTML= formatNumber(number)
    }
}
function formatNumber(number) {
    // To format the given number sequence by adding spaces every four digits
    return number.replace(/(\d{4})/g, '$1 ').trim()
}
function writeMonth() {
    let length = inputCardMonth.value.length

    if(length == 0) {
        textMonth.innerHTML= '00'
    }
    else {
        textMonth.innerHTML= inputCardMonth.value
    }
}
function writeYear() {
    let length = inputCardYear.value.length

    if(length == 0) {
        textYear.innerHTML= '00'
    }
    else {
        textYear.innerHTML= inputCardYear.value
    }
}
function writeCvc() {
    let length = inputCardCvc.value.length

    if(length == 0) {
        textCvc.innerHTML= '000'
    }
    else {
        textCvc.innerHTML= inputCardCvc.value
    }
}

// Function to remove trailing spaces from the inputCardName field value.
function removeTrailingSpaces() {
    inputCardName.value = inputCardName.value.trimEnd();
}


btnConfirm.addEventListener('click', function (event) {
    event.preventDefault()

    // This ensures that any whitespace at the end of the name is trimmed before form submission.
    removeTrailingSpaces()

    checkName()
    checkNumber()
    checkDate()
    checkCvc()
    
    if(btnConfirm.value === 'Confirm') {
        let invalidInputs = document.querySelectorAll(".invalid-input")

        if (invalidInputs.length === 0) {
            console.log("Valid form. Sending...")
        
            form.submit()
            incompleteForm.classList.add("hidden")
            completeForm.classList.remove("hidden")
            main.style.gap = '3em'
        
            btnConfirm.value = 'Continue'
        }
        else {
            console.log("Invalid form. Please correct the erros.")
        }
    }
    else {
        incompleteForm.classList.remove("hidden")
        completeForm.classList.add("hidden")
        main.style.gap = ''

        btnConfirm.value = 'Confirm'

        form.reset()

        // Update the displayed information based on the reset state.
        writeName()
        writeNumber()
        writeMonth()
        writeYear()
        writeCvc()
    }
})