const calculatorBody = document.querySelector('.calculator-body');
const buttons = document.querySelectorAll(".calculator-button");
const display = document.querySelector(".calculator-display");
const clearButton = document.querySelector('.calculator-clear-button');

var displayString = "";


function add(number1, number2) {
    return number1 + number2;
}

function subtract(number1, number2) {
    return number1 - number2;
}

function multiply(number1, number2) {
    return number1 * number2;
}

function divide(number1, number2) {
    return number1 / number2;
}

function operate(operator, number1, number2) {
    switch (operator) {
        case "+":
            return add(number1, number2);
        case "-":
            return subtract(number1, number2);
        case "*":
            return multiply(number1, number2);
        case "/":
            return divide(number1, number2);
        default:
            break;
    }
}

function writeToDisplay(string) {
    displayString += string;
    display.textContent = displayString;
}

function clearDisplay() {
    displayString = "";
    display.textContent = "0";
}

Array.from(buttons).forEach(button => {
    button.addEventListener("click", event => writeToDisplay(button.textContent));
});

clearButton.addEventListener("click", event => clearDisplay());
