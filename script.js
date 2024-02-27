
const button = document.querySelectorAll(".userbtn");


const calculator = {
    displayValue: '0',
    firstNum: null,
    operator: null, 
    secondNumReady: false,
}

function updateDisplay() {
    const display = document.querySelector('.display');
    display.value = calculator.displayValue;
}

function addOperator(chosenOperator) {
    const {displayValue, firstNum, operator} = calculator;
    const inputValue = parseFloat(displayValue);

    if (firstNum === null) {
        calculator.firstNum = inputValue;
    }
    if (operator === null) {
        calculator.operator = chosenOperator;
    } else {
        handleOperator();
        calculator.operator = chosenOperator;
    }

    calculator.secondNumReady = true; 
    calculator.displayValue = chosenOperator;

}

function calculate(firstNum, secondNum, operator) {
    if (operator === '+') {
        return firstNum + secondNum;
    } else if (operator === '-') {
        return firstNum - secondNum; 
    } else if (operator === '*') {
        return firstNum * secondNum;
    } else if (operator === '/') {
        return firstNum / secondNum;
    } 

    return secondNum;
}

function handleOperator(nextOperator) {
    const {firstNum, displayValue, operator} = calculator;
    const inputValue = parseFloat(displayValue);

    if (firstNum === null && !isNaN(inputValue)) {
        calculator.firstNum = inputValue;
    } else if (operator !== null) {
        const result = calculate(firstNum, inputValue, operator);
        calculator.displayValue = String(result); 
        calculator.firstNum = result; 
    }

    calculator.secondNumReady = true; 
    calculator.operator = nextOperator;
}

 
function inputNum(num) {
    const {displayValue, secondNumReady} = calculator;
    if (secondNumReady === true) {
        calculator.displayValue = num; 
        calculator.secondNumReady = false;
    } else {
        calculator.displayValue = displayValue === '0' ? num : displayValue + num;
    }
}

function inputDecimal(decimal) {
    if (!calculator.displayValue.includes(decimal)) {
        calculator.displayValue += decimal;
    } else {
        return;
    }
}

const buttons = document.querySelectorAll('button'); 

buttons.forEach(button => {
    button.addEventListener('click', (event) => {
        const target = event.target;
    
        if (!target.matches('button')) {
            return;
        } else if (target.classList.contains('operator')) {
            console.log('operator', target.textContent);
            addOperator(target.textContent);
            updateDisplay();
            return;
        } else if (target.classList.contains('decimal')) {
            console.log('decimal', target.textContent);
            inputDecimal(target.textContent);
            updateDisplay();
            return;
        } else if (target.classList.contains('clear')) {
            console.log('clear', target.textContent); 
            return;
        } else if (target.classList.contains('num')) {
            console.log('num', target.textContent);
            inputNum(target.textContent);
            updateDisplay();
            return;
        } else if (target.classList.contains('equal')) {
            console.log('equal', target.textContent); 
            handleOperator();
            calculator.operator = null;
            updateDisplay();
            return;
        }
    })
})
