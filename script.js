
const plainText = document.getElementById('plainText');
const shift = document.getElementById('shiftValue');
const cipherButton = document.getElementById('cipher');
const decipherButton = document.getElementById('decipher');
const card = document.getElementById('card');
const card2 = document.getElementById('card2');
const clear = document.getElementById('clear');


const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');

// 3. Logic Functions
function cipherText(textInput, shiftValue) {
    const text = textInput.toLowerCase().trim();
    let cipheredText = '';

    for (let char of text) {
        if (alphabet.includes(char)) {
            let currentIndex = alphabet.indexOf(char);
            let newIndex = (currentIndex + shiftValue) % alphabet.length;
            cipheredText += alphabet[newIndex];
        } else {
            cipheredText += char;
        }
    }
    return cipheredText;
}

function decipherText(cipheredText, shiftValue) {
    let decipheredText = '';

    for (let char of cipheredText) {
        if (alphabet.includes(char)) {
            let currentIndex = alphabet.indexOf(char);
            // Handle negative results with (index - shift + 26) % 26
            let newIndex = (currentIndex - shiftValue + alphabet.length) % alphabet.length;
            decipheredText += alphabet[newIndex];
        } else {
            decipheredText += char;
        }
    }
    return decipheredText;
}

// 4. Storage & UI Helper
function updateStorage(text) {
    localStorage.setItem('cipheredText', text);
    card2.innerHTML = text;
}

// 5. Event Listeners
cipherButton.addEventListener('click', () => {
    const text = plainText.value;
    const shiftValue = parseInt(shift.value) || 0; // Default to 0 if empty
    const result = cipherText(text, shiftValue);
    
    card.innerHTML = result;
    updateStorage(result);
});

decipherButton.addEventListener('click', () => {
    const textToDecipher = card.innerHTML.toLowerCase(); 
    const shiftValue = parseInt(shift.value) || 0;
    
    if (textToDecipher && textToDecipher !== "no text to decipher.") {
        card.innerHTML = decipherText(textToDecipher, shiftValue);
    } else {
        card.innerHTML = "No text to decipher.";
    }
});

clear.addEventListener('click', () => {
    localStorage.removeItem('cipheredText');
    // Important: Clear the actual display boxes too!
    card.innerHTML = "";
    card2.innerHTML = "";
    plainText.value = "";
});

// 6. Persistence: Load saved data when the page opens
window.addEventListener('DOMContentLoaded', () => {
    const saved = localStorage.getItem('cipheredText');
    if (saved) {
        card2.innerHTML = saved;
    }
});
// 1. Add the new selector at the top
const decipherSavedButton = document.getElementById('decipherSaved');

// 2. Add the event listener
decipherSavedButton.addEventListener('click', () => {
    // Target card2 (the stored text)
    const storedText = card2.innerHTML.toLowerCase(); 
    const shiftValue = parseInt(shift.value) || 0;
    
    if (storedText && storedText !== "no text to decipher.") {
        // Run the decipher logic
        const decrypted = decipherText(storedText, shiftValue);
        
        // Update the display to show the decoded message
        card2.innerHTML = decrypted;
        
        // Optional: Update localStorage with the decrypted version
        // localStorage.setItem('cipheredText', decrypted);
    } else {
        card2.innerHTML = "No saved text found.";
    }
});
// implement a list to store all previous encryptions and decryptions.
// 1. Create a new array to hold the history
//