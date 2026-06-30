

const wordInput = document.getElementById('wordInput');
const searchBtn = document.getElementById('searchBtn');
const statusBar = document.getElementById('status');

searchBtn.onclick = function() {

    const word = wordInput.value.trim();

    if (word === '') {
        statusBar.textContent = 'Please type a word!..';
        return;
    }

    statusBar.textContent = 'Searching for " ' + word + '"...';
    console.log('searching for: ', word); 
};

wordInput.addEventListener('keypress', function(event) {
    if(event.key === 'Enter') {
        searchBtn.click();
    }
});