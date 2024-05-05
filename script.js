function insert(num) {
    //Si hay un error de sintaxis, hace un return la función
    if(SyntaxError) { 
        return
    }
    
    // Insertamos un número en la pantalla
    if(display.value.length < 20) {
    
        if(isNaN(num)) {
            display.value += num
        }
        else if(display.value.length == 1 && display.value[0] == 0) {
            display.value = num
        }
        else {
            display.value += num
        }
    }
    else {
        return
    }
}

function clean() {
    // Si hay un error de sintaxis, establece la variable a falso(reinicia)
    SyntaxError = false
    //clear the display value 
    display.value = "0";

}

function equal() {
    var exp = display.value
    var flag = false

    for(i = 0; i < exp.length; i++) {
        if(isNaN(exp[i]) && isNaN(exp[i+1])) {
            if(exp[i] != "+" && exp[i] != "-") {
                //Si hay dos operadores juntos,activa el error de sintaxis
                display.value = "Syntax Error"
                SyntaxError = true
            }

        }
    }

    if(flag == false) { //Si no hay errores calcula la expresion con normalidad
        var answer = eval(exp)

        if(isFinite(answer)) {
            display.value = answer
        }
        else {
            display.value = "Math Error" // Es infinito
            SyntaxError = true
        }
    }
    
}

function back() {
    if(SyntaxError) {
        return
    }

    display.value = display.value.substring(0,display.value.length-1)
    
    if(display.value == "") {
        display.value = "0"
    }

}

//selecting display
const display = document.querySelector('.display')
//selección de todos los numeros
const numbers = document.querySelectorAll('.number')
//evento para cada numero
numbers.forEach( (button) => {
    button.addEventListener('click', calculate)
})
//seleccionado todos los operadores
const operators = document.querySelectorAll('.operator')
//detector de eventos para cada operador
operators.forEach( (button) => {
    button.addEventListener('click', calculate)
})
window.addEventListener('keypress', check)
function check(key) {
    let keyValue = key.key
    if (key.keyCode) {
        if(!isNaN(keyValue)) {
            insert(keyValue)
        } else { 
            if(display.value.length == 1 && display.value[0] == 0) {
                return
            } else {
                for(i = 0; i < operators.length; i++) {
                    if(keyValue == operators[i].value) {
                        if (keyValue == "c") {
                            clean()
                        } else if (keyValue == "<") {
                            back()
                        } else if (keyValue == "=") {
                            equal()
                        } else {
                            display.value += keyValue
                        }
                    }
                }
            } 
        }
    }
}


var SyntaxError = false

function calculate(event) {
    var buttonValue = event.target.value


    if (!isNaN(buttonValue) || (isNaN(buttonValue) && buttonValue != "=" && buttonValue != "<" && buttonValue != "c")) {
        if(buttonValue == "x") {
            buttonValue = "*" //cambiando la x por * pora calcular normalmente
        }
        insert(buttonValue) 

    }
    else if (buttonValue == '=') {
        equal() //llamando la funcion equal
    }
    else if (buttonValue == "<") {
        back() 
    }
    else if (buttonValue == "c") {
        clean()
    }
}
