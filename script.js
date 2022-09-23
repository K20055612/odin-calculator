const calculatorBody = document.querySelector('.calculator-body');
const buttons = document.querySelectorAll(".calculator-button");
const display = document.querySelector(".calculator-display");
const operators = "+-*/";

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
    if(/[a-zA-Z]/g.test(displayString)) {
        clearDisplay();
    }
    if(displayString.length === 0){
        displayString += string;
    }
    else {
        if(operators.includes(displayString.slice(-1))) {
            if(operators.includes(string)) {
                displayString = displayString.slice(0, -1) + string;
            }
            else {
                displayString += string;  
            }
        }
        else {
            displayString += string;  
        }
    }
    
    display.textContent = displayString;
}

function clearDisplay() {
    displayString = "";
    display.textContent = "0";
}

function tokenize(input) {
    let scanner = 0;
    const tokens = [];
  
    while (scanner < input.length) {
      const char = input[scanner];
  
      if (/[0-9]/.test(char)) {
        let digits = '';
  
        while (scanner < input.length && /[0-9\.]/.test(input[scanner])) {
          digits += input[scanner++];
        }
  
        const number = parseFloat(digits);
        tokens.push(number);
        continue;
      }
  
      if (/[+\-/*()^]/.test(char)) {
        tokens.push(char);
        scanner++;
        continue;
      }
  
      if (char === ' ') {
        scanner++;
        continue;
      }
  
      throw new Error(`Invalid token ${char} at position ${scanner}`);
    }
  
    return tokens;
  }
  
  function toRPN(tokens) {
    const operators = [];
    const out = [];
  
    for (let i = 0; i < tokens.length; i++) {
      const token = tokens[i];
  
      if (typeof token === 'number') {
        out.push(token);
        continue;
      }
  
      if (/[+\-/*<>=^]/.test(token)) {
        while (shouldUnwindOperatorStack(operators, token)) {
          out.push(operators.pop());
        }
        operators.push(token);
        continue;
      }
  
      if (token === '(') {
        operators.push(token);
        continue;
      }
  
      if (token === ')') {
        while (operators.length > 0 && operators[operators.length - 1] !== '(') {
          out.push(operators.pop());
        }
        operators.pop();
        continue;
      }
  
      throw new Error(`Unparsed token ${token} at position ${i}`);
    }
  
    for (let i = operators.length - 1; i >= 0; i--) {
      out.push(operators[i]);
    }
  
    return out;
  }
  
  const precedence = { '^': 3, '*': 2, '/': 2, '+': 1, '-': 1 };
  
  function shouldUnwindOperatorStack(operators, nextToken) {
    if (operators.length === 0) {
      return false;
    }
  
    const lastOperator = operators[operators.length - 1];
    return precedence[lastOperator] >= precedence[nextToken];
  }
  
  function evalRPN(rpn) {
    const stack = [];
  
    for (let i = 0; i < rpn.length; i++) {
      const token = rpn[i];
  
      if (/[+\-/*^]/.test(token)) {
        stack.push(operate(token, stack));
        continue;
      }
  
      // token is a number
      stack.push(token);
    }
  
    return stack.pop();
  }
  
  function operate(operator, stack) {
    const a = stack.pop();
    const b = stack.pop();
  
    switch (operator) {
      case '+':
        return b + a;
      case '-':
        return b - a;
      case '*':
        return b * a;
      case '/':
        return b / a;
      case '^':
        return Math.pow(b, a);
      default:
        throw new Error(`Invalid operator: ${operator}`);
    }
  }
  
  function evaluate(input) {
    return evalRPN(toRPN(tokenize(input)));
  }

function evaluateDisplay() {
    if(displayString.length !== 0) {
        let result = Math.round(evaluate(displayString) * 100) / 100;
        clearDisplay();
        writeToDisplay(result);
    }
}

function getElementWithoutEventListeners(element) {
    var new_element = element.cloneNode(true);
    element.parentNode.replaceChild(new_element, element);
    return new_element;
}

var clearButton = document.querySelector('.calculator-clear-button');
clearButton = getElementWithoutEventListeners(clearButton);
var equalsButton = document.querySelector('.calculator-equals-button');
equalsButton = getElementWithoutEventListeners(equalsButton);


Array.from(buttons).forEach(button => {
    button.addEventListener("click", event => writeToDisplay(button.textContent));
});

clearButton.addEventListener("click", event => clearDisplay());

equalsButton.addEventListener("click", event => console.log(evaluateDisplay(displayString)));