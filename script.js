let previousResult = '';
result = '0';
let a = '';
let b = '';
let currentOperator = '';
let lastResult = '';

const displayResult = document.querySelector('#display-result');
const displayPreviousResult = document.querySelector('#last-calc');


function addToDisplay(valor) {

    if(isNaN(parseFloat(valor))){       

        if(a === '' && valor === '-'){
            a = valor;
            displayResult.textContent = a;
        }
        else { 

            if(valor === '+' || valor === '-' || valor === '*' || valor === '/'){
                currentOperator = valor;
            }

            if(valor === ','){

                if(currentOperator === '' && !a.includes(',')){
                    a += valor;
                } else if(!b.includes(',')){
                    b += valor;
                }
            }

            if(valor === '+/-'){
                if(currentOperator === ''){
                    a = (parseFloat(a.replace(',', '.')) * -1).toString().replace('.', ',');
                    displayResult.textContent = a;
                }
                if(b !== ''){                   
                    result = (calculate(a, b, currentOperator) * -1).toString().replace('.', ',');
                    lastResult = `+/- (${a}${currentOperator}${b})`
                    displayPreviousResult.textContent = lastResult.toString().replace('.', ',');
                    displayResult.textContent = result;

                    a = result.toString().replace('.', ',');
                    b= '';
                    currentOperator='';
                }
            }

            if(valor === '%'){
                if (a !== '' && currentOperator === ''){
                    currentOperator = valor;
                }

                if( a !== '' && currentOperator !== '' && b!== '' && !b.includes(valor)){
                    b += valor;
                }
            }

            if(valor === '='){
                result = calculate(a, b, currentOperator).toString().replace('.', ',');
                lastResult = a + currentOperator + b;
                displayPreviousResult.textContent = lastResult.toString().replace('.', ',');
                displayResult.textContent = result;

                a = result.toString().replace('.', ',');
                b= '';
                currentOperator='';
            }

            
        }

    } else {
        if(result!== '' && lastResult !== ''){
            a = valor;
            lastResult = result;
            result = ''
            displayPreviousResult.textContent = lastResult;

        } else if(currentOperator === '' && a !== '0'){
            a += valor;
        } else if(a=== '0'){
            a = valor;
        }
        else {
            b += valor;
        }        
    }

    if(valor !== '='){
        displayResult.textContent = a+currentOperator+b;
    }
    
 
}

function calculate(opA, opB, operator){
    a = parseFloat(opA.replace(',', '.'));
    
    if(b.includes('%')){
        let valuePercent = parseFloat(b.split('%')[0].replace(',', '.'));
        b = a * (valuePercent/100);
    } else {
        b = parseFloat(opB.replace(',', '.'));
    }

    switch(operator){
        case '+':
            return a + b;
        case '-':
            return a - b;
        case '*':
            return a * b;
        case '/':
            return a / b;
        case '%':
            return a % b;
        default:
            return a;
        
    }

}

function clearLastDigit(){
    if(currentOperator === ''){
        a = a.slice(0, a.length - 1);
    } else if(currentOperator !== '' && b === ''){
        currentOperator='';
    } else {
        b = b.slice(0, b.length - 1);
    }


    displayResult.textContent = (a === '' ? '0': a) + currentOperator + b;
}

function clearAll(){
    a = '0';
    currentOperator='';
    b= '';
    displayPreviousResult.textContent = '';
    displayResult.textContent = a;

}
