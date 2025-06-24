let currentValue = '0';
let previousValue = null;
let operation = null;
let resetDisplay = false;

const numberHandle = (num) => {
    if(currentValue === '0' || resetDisplay) {
        currentValue = num;
        resetDisplay = false
    } else {
        currentValue += num;
    }
        updateDisplay();
};

const operatorHandle = (oper) => {
    if(operation !== null && !resetDisplay) {
        operate()
    }
    previousValue = currentValue;
    operation = oper;
    resetDisplay = true;
};

const equalHandle = () => {
   if(operation === null) return 
   operate();
   operation = null;
};

const decimalHandle = () => {
  if(!currentValue.includes('.')) {
    currentValue += '.';
  }
  updateDisplay();
};

const controlHandle = (data) => {
    if(data === 'AC') {
        currentValue = '0'
        resetDisplay = false;
        operation = null;
    } else if (data === 'DEL') {
        currentValue =
            currentValue.length > 1 ? currentValue.slice(0, -1) : '0';
    }
    updateDisplay();
};

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
