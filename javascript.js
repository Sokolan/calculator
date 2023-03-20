MAX_NUM_LEN = 10;
let mainDisplay = '0';
let prevDisplay = '';
let opDisplay = '';

function polluteMainDisplay(){
    let container = document.querySelector('.curr-number');
    container.textContent = mainDisplay;
}

function pollutePrevDisplay(){
    const container = document.querySelector('.prev-number');
    container.textContent = prevDisplay;
}

function polluteOpDisplay(){
    const container = document.querySelector('.operation');
    container.textContent = opDisplay;
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
    if(mainDisplay.length >= MAX_NUM_LEN){
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
    opDisplay = this.textContent;
    polluteOpDisplay();
    // If we already have prev number, allow to change the operand.
    if(prevDisplay !== ''){
        return 
    }
    prevDisplay = mainDisplay
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
    opDisplay = '';
    polluteMainDisplay();
    pollutePrevDisplay();
    polluteOpDisplay();

}

// Core functions
function clearOpAndPrev(){
    prevDisplay = opDisplay = '';
    polluteOpDisplay();
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

function equalClickedEvent(){
    if(prevDisplay === ''){
        return;
    }
    const lnum = Number.parseFloat(prevDisplay);
    const rnum = Number.parseFloat(mainDisplay);
    
    switch(opDisplay){
        case '+':
            mainDisplay = addFunc(lnum, rnum);
            break;
        case '-':
            mainDisplay = subFunc(lnum, rnum);
            break;
        case 'x':
            mainDisplay = mulFunc(lnum, rnum);
            break;
        case '/':
            mainDisplay = divFunc(lnum, rnum);
            break;
    }

    // Remove .0 notation
    if(mainDisplay.length > 1){
        mainDisplay = mainDisplay.slice(-1) === '0' ? Math.trunc(mainDisplay) : mainDisplay;
    }
    // make sure the final result isn't overflowing
    let intLen = mainDisplay.toString().length;
    if(mainDisplay.toString().indexOf('.') != -1){
        intLen = mainDisplay.slice(0, mainDisplay.indexOf('.')).length;
    }

    if(intLen >= MAX_NUM_LEN){
        alert('too many integers!');
        mainDisplay = '0';
    }
    polluteMainDisplay();
    clearOpAndPrev();

}


setOperations();
setNumbers();