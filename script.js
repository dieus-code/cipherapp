
const plainText = document.getElementById('plainText');
const encryptedText =document.getElementById('encryptedText');
const shift = document.getElementById('shiftValue');
const unshift = document.getElementById('unshiftValue');
const cipherButton = document.getElementById('cipher');
const decipherButton = document.getElementById('decipher');
const card = document.getElementById('card');
const card2 = document.getElementById('card2');
const deleteBtn = document.getElementById('delete');


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

// 5. Event Listeners
cipherButton.addEventListener('click', () => {
    const text = plainText.value;
    const shiftValue = parseInt(shift.value) || 0; // Default to 0 if empty
    const result = cipherText(text, shiftValue);
    
    card.innerHTML = result;
    historyList.innerHTML = '';
    saveMessageToLocalStorage('cipheredText', result);
    renderHistory('cipheredText');
});

decipherButton.addEventListener('click', () => {
    const text = encryptedText.value;
    const shiftValue = parseInt(unshift.value) || 0;
    const result = decipherText(text, shiftValue);
    
    card2.innerHTML = result;
   
});
function saveMessageToLocalStorage(type, message) {
    // 1. Correctly assign the key name based on the type
    let storageKey = type === 'cipheredText' ? 'encryptedMessages' : 'decryptedMessages';

    // 2. Get the existing array for that specific key
    let messages = JSON.parse(localStorage.getItem(storageKey)) || [];

    // 3. Add the new message to the array
   messages.push({
    text: message,
    time: new Date().toLocaleTimeString()
});

    // 4. Save the updated array back to localStorage
    localStorage.setItem(storageKey, JSON.stringify(messages));
}

function renderHistory(type) {
    const storageKey = type === 'cipheredText' ? 'encryptedMessages' : 'decryptedMessages';
    const messages = JSON.parse(localStorage.getItem(storageKey)) || [];
    
    // Assuming you have a <ul> or <div> with this ID in your HTML
    const historyList = document.getElementById('historyList');
    historyList.innerHTML = ''; 

    messages.forEach((item, index) => {
        const li = document.createElement('li');
        li.className = "history-item";

        // Create the checkbox
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'history-checkbox';
        // You can use the index to identify which message this checkbox belongs to
        checkbox.dataset.index = index; 

        // Create the text label
        const span = document.createElement('span');
        span.innerHTML = `  ${item.text} <strong> [${item.time}]</strong>`;

        // Append them to the list item
        li.appendChild(checkbox);
        li.appendChild(span);
        historyList.appendChild(li);
     

    });
}
function deleteSelectedMessages(type) {
    const storageKey = type === 'cipheredText' ? 'encryptedMessages' : 'decryptedMessages';
    let messages = JSON.parse(localStorage.getItem(storageKey)) || [];

    // Get all checkboxes that are checked
    const checkboxes = document.querySelectorAll('.history-checkbox:checked');
    
    // We get the indices of items to remove
    const indicesToRemove = Array.from(checkboxes).map(cb => parseInt(cb.dataset.index));

    // Filter the array: keep only items whose index is NOT in our "to remove" list
    const filteredMessages = messages.filter((_, index) => !indicesToRemove.includes(index));

    // Save the new filtered list back to storage and refresh UI
    localStorage.setItem(storageKey, JSON.stringify(filteredMessages));
    renderHistory(type);
}
// This ensures the list appears immediately on refresh
document.addEventListener('DOMContentLoaded', () => {
    // If you want to show both, call them both
    renderHistory('cipheredText'); 
    
});
