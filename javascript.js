MAX_MAIN_LEN = 12;
MAX_RES_LEN = 16;
MAX_PREV_LEN = 40;
let mainDisplay = '0';
let prevDisplay = '';

function polluteMainDisplay(){
    let container = document.querySelector('.curr-number');
    container.textContent = mainDisplay;
}

function pollutePrevDisplay(){
    const container = document.querySelector('.prev-number');
    if(prevDisplay.length >= MAX_PREV_LEN){
        alert('Seconadary display max lenght exceeded!');
        clearClickedEvent();
    }
    container.textContent = prevDisplay;
}



// Numbers functions
function createButtons(){
    const container = document.querySelector('.numbers-container');

    let row = document.querySelector('.row');
    num = document.createElement('button');
    num.classList.add('number');
    num.textContent = (0).toString();
    row.insertBefore(num, row.firstChild);


    for(let i = 1 ; i <= 9 ; ++i){
        if(i % 3 === 1){
            row = document.createElement('div')
            row.classList.add('row');
            container.insertBefore(row, container.firstChild);
        }
        const num = document.createElement('button');
        num.classList.add('number');
        num.textContent = i.toString();
        row.appendChild(num);
    }
}

function numClickedEvent(){
    if(mainDisplay.length >= MAX_MAIN_LEN){
        alert("Number maximum length has been reached!");
        return;
    }
    mainDisplay.toString() === '0' ?   mainDisplay = this.textContent : mainDisplay += this.textContent;
    polluteMainDisplay();
}

function setNumbers(){
    createButtons();
    const numbers = document.querySelectorAll('.number');
    numbers.forEach(number => number.addEventListener('click', numClickedEvent));
}

function signClickedEvent(){
    if(mainDisplay === '0'){
        return;
    }
    else if(mainDisplay[0] === '-'){
        mainDisplay = mainDisplay.slice(1);
    }
    else{
        mainDisplay = '-' + mainDisplay;
    }
    polluteMainDisplay();
}

function dotClickedEvent(){
    if(mainDisplay.toString().slice(-1) === '.'){
        mainDisplay = mainDisplay.slice(0, -1);
    }
    else if(mainDisplay.toString().indexOf('.') !== -1){
        return;
    }
    else{
        mainDisplay += '.';
    }
    polluteMainDisplay();
}

// Operations functions
function operationClicked(){
    prevDisplay += `${mainDisplay} ${this.textContent} `;
    mainDisplay = '0';
    polluteMainDisplay();
    pollutePrevDisplay();
}

function setOperations(){
    const operations = document.querySelectorAll('.operations-container > *');
    operations.forEach(op => op.addEventListener('click', operationClicked));
}

// Util functions
function delClickedEvent(){
    mainDisplay.length === 1 ? mainDisplay = "0" : mainDisplay = mainDisplay.slice(0, -1);
    if(mainDisplay === '-'){
        mainDisplay = '0';  
    } 
    polluteMainDisplay();
}

function clearClickedEvent(){
    mainDisplay = '0';
    prevDisplay = '';
    polluteMainDisplay();
    pollutePrevDisplay();
}

// Core functions
function clearPrev(){
    prevDisplay = '';
    pollutePrevDisplay();
}

function addFunc(a,b){
    return (a+b).toString();
}

function subFunc(a,b){
    return (a-b).toString();
}

function mulFunc(a,b){
    return (a*b).toFixed(5).toString();
}

function divFunc(a,b){
    if(b.toString() === '0'){
        alert("Can't divide by 0!");
        return 0;
    }
    return (a/b).toFixed(5).toString();
}

function operate(lop, operation, rop){
    switch(operation){
        case '+':
            return addFunc(parseFloat(lop),parseFloat(rop));
        case '-':
            return subFunc(parseFloat(lop),parseFloat(rop));
        case 'x':
            return mulFunc(parseFloat(lop),parseFloat(rop));
        case '/':
            return divFunc(parseFloat(lop),parseFloat(rop));
        default:
            alert("OPERATION ERROR");
            return;
    }
}

function handleFloat(num){
    if(num.indexOf('.') === -1){
        return num;
    }
    // Remove .0 zoroes
    if(num.slice(-1) === '0'){
        let index = num.length - 1;
        while(num.charAt(index) === '0' || num.charAt(index) === '.'){
            if(num.charAt(index) === '.'){
                --index;
                break;
            }
            --index;
        }
        num = num.slice(0,index + 1);
    }
    return num;
}

function handleLen(){
    if(mainDisplay.length > MAX_RES_LEN){
        mainDisplay = '0';
        alert('Num size overflow!');
    }
}

function equalClickedEvent(){
    if(prevDisplay === ''){
        return;
    }

    prevDisplay += mainDisplay;
    const input = prevDisplay.split(" ");
    let lnum = input[0];

    for(let i = 1 ; i < (input.length - 1) ; i += 2){
        lnum = operate(lnum, input[i], input[i + 1]);

    }

    lnum = handleFloat(lnum);
    mainDisplay = lnum;
    handleLen();
    polluteMainDisplay();
    clearPrev();
}


setOperations();
setNumbers();