const plainText = document.getElementById('plainText');
const cipherButton = document.getElementById('cipher');
const decipherButton = document.getElementById('decipher');
const card = document.getElementById('card');
const card2 = document.getElementById('card2');
const shift = document.getElementById('shiftValue');
const clear = document.getElementById('clear');

function cipherText(plainText, shift) {
    const text = plainText.toLowerCase().trim();
    let alphabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
    let cipheredText = '';
    for (let i = 0; i < text.length; i++) {
        const char = text[i];
        if (alphabet.includes(char)) {
            let currentIndex = alphabet.indexOf(char);
            let newIndex = (currentIndex + shift) % alphabet.length;
            cipheredText += alphabet[newIndex];
        } else {
            cipheredText += char;
        }
    }
    saveTasksToLocalStorage(cipheredText);
    return cipheredText;

}
function decipherText(cipheredText, shift) {
    let alphabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
    let decipheredText = '';
    for (let i = 0; i < cipheredText.length; i++) {
        const char = cipheredText[i];
        if (alphabet.includes(char)) {
            let currentIndex = alphabet.indexOf(char);
            let newIndex = (currentIndex - shift + alphabet.length) % alphabet.length;
            decipheredText += alphabet[newIndex];
        } else {
            decipheredText += char;
        }
    }
    return decipheredText;
}
cipherButton.addEventListener('click', () => {
    let text = plainText.value.toLowerCase();
    let shiftValue = parseInt(shift.value);
    card.innerHTML = cipherText(text, shiftValue);
});
decipherButton.addEventListener('click', () => {
    // Get the text to decipher from the 'card' element, not the 'plainText' input
    let textToDecipher = card.innerHTML.toLowerCase(); 
    let shiftValue = parseInt(shift.value);
    
    // Check if there is text to decipher
    if (textToDecipher) {
        card.innerHTML = decipherText(textToDecipher, shiftValue);
    } else {
        card.innerHTML = "No text to decipher.";
    }
});
function saveTasksToLocalStorage(textToSave) {
    localStorage.setItem('cipheredText', textToSave);
    const savedText = localStorage.getItem('cipheredText');
    if (savedText) {
        card2.innerHTML = savedText;
    }
}
function selectClear(){
    
};
clear.addEventListener('click', () => {
    
    localStorage.removeItem('cipheredText');
});