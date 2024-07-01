const MASTER_PASSWORD = "senha123"; // Defina a senha mestre aqui

document.getElementById('create-match-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const enteredPassword = prompt('Digite a senha mestre para criar um rachão:');

    if (enteredPassword !== MASTER_PASSWORD) {
        alert('Senha mestre incorreta.');
        return;
    }

    const title = document.getElementById('title').value;
    const date = document.getElementById('date').value;
    const location = document.getElementById('location').value;
    
    const match = {
        id: Date.now(), // Unique ID for each match
        title: title,
        date: date,
        location: location,
        players: [] // List of players who signed up for the match
    };
    
    let matches = JSON.parse(localStorage.getItem('matches')) || [];
    matches.push(match);
    localStorage.setItem('matches', JSON.stringify(matches));
    
    alert('Rachão criado com sucesso!');
    
    // Limpar o formulário
    document.getElementById('create-match-form').reset();
    
    displayMatches();
});

document.getElementById('clear-matches-btn').addEventListener('click', function() {
    const enteredPassword = prompt('Digite a senha mestre para limpar os rachões antigos:');

    if (enteredPassword !== MASTER_PASSWORD) {
        alert('Senha mestre incorreta.');
        return;
    }

    if (confirm('Tem certeza que deseja limpar todos os rachões antigos?')) {
        localStorage.removeItem('matches');
        displayMatches();
        alert('Todos os rachões antigos foram removidos.');
    }
});

function displayMatches() {
    const matchesList = document.getElementById('matches-list');
    matchesList.innerHTML = '';
    
    let matches = JSON.parse(localStorage.getItem('matches')) || [];
    
    matches.forEach(match => {
        const matchItem = document.createElement('li');
        matchItem.innerHTML = `
            ${match.title} - ${new Date(match.date).toLocaleDateString('pt-BR')} - ${match.location}
            <button onclick="signUp(${match.id})">Inscrever-se</button>
            <button onclick="viewPlayers(${match.id})">Ver Jogadores</button>
        `;
        matchesList.appendChild(matchItem);
    });
}

function signUp(matchId) {
    const username = prompt('Digite seu nome de usuário:');
    if (username) {
        let matches = JSON.parse(localStorage.getItem('matches')) || [];
        const matchIndex = matches.findIndex(match => match.id === matchId);
        if (matchIndex !== -1) {
            const match = matches[matchIndex];
            if (!match.players) {
                match.players = [];
            }
            if (match.players.length >= 20) {
                alert('O limite de 20 jogadores para este rachão foi atingido.');
                return;
            }
            if (!match.players.includes(username)) {
                match.players.push(username);
                localStorage.setItem('matches', JSON.stringify(matches));
                alert(`Você se inscreveu no rachão "${match.title}"`);
            } else {
                alert('Você já está inscrito neste rachão.');
            }
        } else {
            alert('Rachão não encontrado!');
        }
    } else {
        alert('Nome de usuário é necessário para se inscrever.');
    }
}

function viewPlayers(matchId) {
    const playersList = document.getElementById('players-list');
    playersList.innerHTML = '';
    
    let matches = JSON.parse(localStorage.getItem('matches')) || [];
    const match = matches.find(match => match.id === matchId);
    
    if (match) {
        if (match.players && match.players.length > 0) {
            match.players.forEach(player => {
                const playerItem = document.createElement('li');
                playerItem.textContent = player;
                playersList.appendChild(playerItem);
            });
        } else {
            playersList.innerHTML = '<li>Nenhum jogador inscrito</li>';
        }
    } else {
        alert('Rachão não encontrado!');
    }
}

// Exibir os rachões ao carregar a página
document.addEventListener('DOMContentLoaded', displayMatches);
