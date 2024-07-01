const textInput = document.querySelector('#textInput');
const textOutput = document.querySelector('.card');
const btnEncrypt = document.querySelector('.btnEncrypt');
const btnDecrypt = document.querySelector('.btnDecrypt');

const encrypt = {
    'a': 'ai',
    'e': 'enter',
    'i': 'imes',
    'o': 'ober',
    'u': 'ufat'
}


function disableBtn() {
    btnDecrypt.style.backgroundColor = 'gray';
    btnDecrypt.disabled = true;    
}

function enableBtn(){
    btnDecrypt.style.backgroundColor = '#0A3871';
    btnDecrypt.disabled = false;
}

// Función para filtrar caracteres no deseados
textInput.addEventListener('keypress', (event) => {
    const char = String.fromCharCode(event.which);
    const isLowercase = char >= 'a' && char <= 'z';
    const isWhitespace = char === ' ' || char === '\n';
    if (!isLowercase && !isWhitespace) {
        event.preventDefault();
    }
});

textInput.addEventListener('input', () => {
    // Si el "textarea" contiene texto se habilita el botón "Desencriptar"
    if (textInput.value.trim().length > 0) {
        enableBtn();
    } else {
        disableBtn();
    }

    // Reemplaza todo lo que no sea minúsculas o espacios
    const sanitizedValue = textInput.value.replace(/[^a-z\s]/g, ''); 
    if (textInput.value !== sanitizedValue) {
        textInput.value = sanitizedValue;
    }
});

disableBtn();

btnEncrypt.addEventListener('click', () => {
    if(textInput.value !== ''){
        // Se encripta el texto
        let textEncrypted = '';
        const vowels = ['a', 'e', 'i', 'o', 'u'];
        
        // Se itera por palabra
        for(let i of textInput.value.split(" ")) {
            console.log(i);
            // se itera el arreglo de vocales
            for(let vowel of vowels){
                // Se itera por cada letra de cada palabra
                for(let letter of i){
                    if(letter === vowel){
                        //console.log(encrypt[letter]);
                        textEncrypted += i.replace(letter, encrypt[letter]);
                        //console.log(textEncrypted);
                    } else if(letter !== vowel) {
                        textEncrypted += letter;
                    }
                }
            }
        }

        console.log(textEncrypted);

        textOutput.innerHTML = '';
        let cardContent = `
        <p>Espera rey, aun esta en desarrollo</p>
        `;
        textOutput.innerHTML = cardContent;
    } else {
        console.log('Nada que mostrar por el momento');
    }
})