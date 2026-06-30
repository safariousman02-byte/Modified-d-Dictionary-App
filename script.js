

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

        statusBar.textContent = 'Please type a word!';
        statusBar.className = 'status-error';
        return;
    }

    statusBar.textContent = 'Searching for " ' + searchTerm + '"...';
    statusBar.className = 'status-loading';

    document.getElementById('result').innerHTML = '<p id="status">Searching...</p>';

    fetch('https://api.dictionaryapi.dev/api/v2/entries/en/' + searchTerm)
        .then(function(res) {

            if (!res.ok) {
                throw new Error('Word not found');
            }
            return res.json();
        })
        .then(function(data) {

            const wordData = data[0];
            const meaning = wordData.meanings[0];
            const definition = meaning.definitions[0];

            let html = '<div class="word-card">';

                html += '<h2>' + wordData.word + '</h2>';

                if (wordData.phonetic) {
                    html += '<div class="phonetic">' + wordData.phonetic + '</div>';
                }

                html += '<span class="part-of-spech">' + meaning.partOfSpeech + '</span>';

                html += '<span class="meaning">' + definition.definition + '</span>';

                if (definition.example) {
                    html += '<div class="example">' + definition.example + '</div>';
                }

            html += '</div>';

            document.getElementById('result').innerHTML = html;
            statusBar.textContent = 'Found definition for " ' + searchTerm + ' "';
            statusBar.className = '';

            console.log('Api Response: ' + data);
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
    searchWord();
};

wordInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        searchWord();
    }
});

console.log("Yo sup?..");l