document.getElementById('create-match-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const title = document.getElementById('title').value;
    const date = document.getElementById('date').value;
    const location = document.getElementById('location').value;
    
    const match = {
        title: title,
        date: date,
        location: location
    };
    
    let matches = JSON.parse(localStorage.getItem('matches')) || [];
    matches.push(match);
    localStorage.setItem('matches', JSON.stringify(matches));
    
    alert('Rachão criado com sucesso!');
    
    // Limpar o formulário
    document.getElementById('create-match-form').reset();
    
    displayMatches();
});

function displayMatches() {
    const matchesList = document.getElementById('matches-list');
    matchesList.innerHTML = '';
    
    let matches = JSON.parse(localStorage.getItem('matches')) || [];
    
    matches.forEach(match => {
        const matchItem = document.createElement('li');
        matchItem.textContent = `${match.title} - ${new Date(match.date).toLocaleDateString('pt-BR')} - ${match.location}`;
        matchesList.appendChild(matchItem);
    });
}

// Exibir os rachões ao carregar a página
document.addEventListener('DOMContentLoaded', displayMatches);
