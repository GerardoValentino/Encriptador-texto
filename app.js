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
        for(let word of textInput.value.split(" ")) {
            // console.log(word);
            for(let letter of word){
                console.log(letter);
                if(vowels.includes(letter)){
                    textEncrypted += encrypt[letter];
                } else {
                    textEncrypted += letter;
                }
            }
            textEncrypted += ' ';
        }

        console.log(textEncrypted);

        textOutput.innerHTML = '';
        let cardContent = `
        <p>${textEncrypted}</p>
        <br>
        `;
        textOutput.innerHTML = cardContent;

        // Revisar el codigo del curso de JS para insertar el boton de copiar, era un metodo que se le ponia un atributo llamado "afterbegin" creo XD
    } else {
        cardContent = `
        <img style="width: 80%; border-radius: 8px;" src="images/astronaut.png" alt="">
        <h1>Ningún mensaje fue encontrado</h1>
        <br>
        <p>Ingresa el texto que deseas encriptar o desencriptar</p>`;
        textOutput.innerHTML = cardContent;
    }
})