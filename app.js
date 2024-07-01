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

const decrypt = {
    'ai': 'a',
    'enter': 'e',
    'imes': 'i',
    'ober': 'o',
    'ufat': 'u'
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
                //console.log(letter);
                if(vowels.includes(letter)){
                    textEncrypted += encrypt[letter];
                } else {
                    textEncrypted += letter;
                }
            }
            textEncrypted += ' ';
        }

        //console.log(textEncrypted);

        textOutput.innerHTML = '';
        let cardContent = `
            <p>${textEncrypted}</p>
            <br>
        `;
        textOutput.innerHTML = cardContent;

        const copyButton = `
            <button class="btnCopy" 
                style="background-color: white;
                        color: black;
                        border: dashed;
                        width: 90%;"
            >Copiar</button>
        `;

        textOutput.insertAdjacentHTML('beforeend', copyButton);
        //...
        document.querySelector('.btnCopy').addEventListener('click', () => {
            // API de portapapeles para copiar el texto
            navigator.clipboard.writeText(textEncrypted).then(function() {
                console.log('Texto copiado al portapapeles');
                alert('Texto copiado al portapapeles');
            }).catch(function(error) {
                console.error('Error al copiar el texto: ', error);
                alert('Hubo un error al copiar el texto');
            });
        });

    } else {
        cardContent = `
        <img style="width: 80%; border-radius: 8px;" src="images/astronaut.png" alt="">
        <h1>Ningún mensaje fue encontrado</h1>
        <br>
        <p>Ingresa el texto que deseas encriptar o desencriptar</p>`;
        textOutput.innerHTML = cardContent;
    }
});

btnDecrypt.addEventListener('click', () => {
    let textDecrypted = '';
    const keys = ['ai', 'enter', 'imes', 'ober', 'ufat'];
    // Se itera por palabra
    for(let word of textInput.value.split(" ")) {
        //console.log(word);
        if(word.includes('ai')){
            textDecrypted += word.replaceAll('ai', decrypt['ai']);
        }
    }
    console.log(textDecrypted);

});