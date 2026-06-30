

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

function searchWord(word) {

    const searchTerm = word || wordInput.value.trim();

    if (!searchTerm) {

        statusBar.textContent = 'Please type a word!..';
        statusBar.className = 'status-error';
        return;
    }

    statusBar.textContent = 'Searching for " ' + searchTerm + '"...';
    statusBar.className = 'Status-Loading';

    document.getElementById('result').innerHTML = '<p id="status">Searcching...</p>';

    fetch('https://api.dictionaryapi.dev/api/v2/entries/en/' + searchTerm)
        .then(function(res) {

            if (!res.ok) {
                throw new Error('Word not found');
            }
            return res.json();
        })
        .then(function(data) {

            console.log("Api Response: ", data);
            statusBar.textContent = 'Found definition for " ' + searchTerm + ' "';
            statusBar.className = '';

            alert('Word found! check console for data.');
        })
        .catch(function() {
            statusBar.textContent = 'No definition found for " ' + searchTerm + '"';
            statusBar.className = 'Status-error';
        });
}

searchBtn.onclick = function() {
    searchWord(player);
};

wordInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        searchWord();
    }
});

console.log("Yo sup?..");l