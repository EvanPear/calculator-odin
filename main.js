let currentValue = '0';
let previousValue = null;
let operation = null;
let resetDisplay = false;

const buttons = document.querySelectorAll('.btn');
const display = document.querySelector('#display');
const controls = document.querySelectorAll('.control');
const recentEquation = document.querySelector('.recent-equation');

buttons.forEach(button => {
    const value = button.textContent;

    button.addEventListener('click', () => {
        if(button.classList.contains('numeric-btn')) {
            numberHandle(value);
        } else if(button.classList.contains('operator-btn')) {
            operatorHandle(value);
        } else if(button.classList.contains('equal-btn')) {
            equalHandle();
        } else if(button.classList.contains('decimal-point')) {
            decimalHandle();
        }
    })
}); 

controls.forEach(control => {
    const action = control.dataset.action;

    control.addEventListener('click', () => {
        if(action === 'AC') {
            controlHandle(action);
        } else if(action === 'DEL') {
            controlHandle(action);
        }
    })
});

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
        recentEquation.textContent = '';
    } else if (data === 'DEL') {
        currentValue =
            currentValue.length > 1 ? currentValue.slice(0, -1) : '0';
        if(currentValue === '0') {
            recentEquation.textContent = '';
        }    
    }
    updateDisplay();
};

const updateDisplay = () => {
   let cleanDisplay = parseFloat(currentValue);

   let split = currentValue.split('.');

   split[0] = split[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');

   display.textContent = split.join('.');

   if(
    cleanDisplay !== 0 &&
    (cleanDisplay >= 1e11 || cleanDisplay <= 1e-9)
   ) {
    display.textContent = cleanDisplay.toExponential(5)
   }
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
    recentEquation.textContent = `${prev} ${operation} ${curr} = ${result}`;
    updateDisplay();
};
