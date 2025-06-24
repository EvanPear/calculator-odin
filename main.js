let currentValue = '0';
let previousValue = null;
let operation = null;
let resetDisplay = false;

const updateDisplay = () => {
    display.textContent = currentValue;
};

const operate = () => {
    let result;

    let prev = parseFloat(previousValue);
    let curr = parseFloat(currentValue);

    switch(operation) {
        case '+':
          result = prev + curr;
          break;
        case '-':
            result = prev - curr;
            break;
        case '*':
            result = prev * curr;
            break;
        case '/':
            result = prev / curr;
            break;
        default: 
            return;              
    }

    currentValue = result.toString();
    resetDisplay = true;
    updateDisplay();
};
