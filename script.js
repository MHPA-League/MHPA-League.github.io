const db = firebase.firestore();
const auth = firebase.auth();

// DOM Elements
const standingsContainer = document.getElementById('standings-container');
const playoffContainer = document.getElementById('playoff-container');
const awardsContainer = document.getElementById('awards-container');
const adminStandings = document.getElementById('admin-standings');
const adminPlayoffs = document.getElementById('admin-playoffs');
const adminAwards = document.getElementById('admin-awards');

// Load Standings
function loadStandings() {
    db.collection('standings').get().then((querySnapshot) => {
        standingsContainer.innerHTML = '<h3>Under Appreciated</h3>';
        standingsContainer.innerHTML += '<div>Young Money</div>';
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            if (['Gods Country', 'Money in the Grave', 'NightCrawlers', 'Legends'].includes(data.teamName)) {
                standingsContainer.innerHTML += `<div>${data.teamName}: ${data.wins}-${data.losses}</div>`;
            }
        });
        standingsContainer.innerHTML += '<div>AstroWorld</div>';
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            if (['Butterfly Effect', 'Underground Kings', 'JumpMen', 'Antidote'].includes(data.teamName)) {
                standingsContainer.innerHTML += `<div>${data.teamName}: ${data.wins}-${data.losses}</div>`;
            }
        });
        standingsContainer.innerHTML += '<h3>Overly Hated</h3>';
        standingsContainer.innerHTML += '<div>Twilight Zone</div>';
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            if (['Bandits', 'No Role Models', 'Lucid Dreams', 'Fire Squad'].includes(data.teamName)) {
                standingsContainer.innerHTML += `<div>${data.teamName}: ${data.wins}-${data.losses}</div>`;
            }
        });
        standingsContainer.innerHTML += '<div>DreamVille</div>';
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            if (['Armed and Dangerous', 'Stealth Mode', 'Doomsday', 'Nobody’s Perfect'].includes(data.teamName)) {
                standingsContainer.innerHTML += `<div>${data.teamName}: ${data.wins}-${data.losses}</div>`;
            }
        });
    });
}

// Load Playoffs (Placeholder)
function loadPlayoffs() {
    db.collection('playoffs').orderBy('seed').get().then((querySnapshot) => {
        playoffContainer.innerHTML = '<div>Play-In: 4 vs 5</div><div>Round 1</div><div>Semifinals</div><div>Finals</div>';
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            playoffContainer.innerHTML += `<div>${data.seed}: ${data.teamName}</div>`;
        });
    });
}

// Load Awards
function loadAwards() {
    db.collection('awards').get().then((querySnapshot) => {
        awardsContainer.innerHTML = '';
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            awardsContainer.innerHTML += `<div>${data.award}: ${data.player}</div>`;
        });
    });
}

// Admin Login
document.getElementById('admin-login').addEventListener('click', () => {
    const email = prompt('Admin Email:');
    const password = prompt('Password:');
    auth.signInWithEmailAndPassword(email, password)
        .then(() => {
            adminStandings.classList.remove('hidden');
            adminPlayoffs.classList.remove('hidden');
            adminAwards.classList.remove('hidden');
        })
        .catch((error) => alert('Login failed: ' + error.message));
});

// Update Team
function updateTeam() {
    const teamName = document.getElementById('teamName').value;
    const wins = document.getElementById('wins').value;
    const losses = document.getElementById('losses').value;
    db.collection('standings').doc(teamName).set({
        teamName: teamName,
        wins: parseInt(wins),
        losses: parseInt(losses)
    }).then(() => loadStandings());
}

// Update Playoff
function updatePlayoff() {
    const teamName = document.getElementById('playoffTeam').value;
    const seed = document.getElementById('seed').value;
    db.collection('playoffs').doc(teamName).set({
        teamName: teamName,
        seed: parseInt(seed)
    }).then(() => loadPlayoffs());
}

// Update Award
function updateAward() {
    const awardType = document.getElementById('awardType').value;
    const player = document.getElementById('awardPlayer').value;
    const awardNames = {
        mvp: 'MVP',
        rookie: 'Rookie of the Year',
        defensive: 'Defensive Player',
        offensive: 'Offensive Player'
    };
    db.collection('awards').doc(awardType).set({
        award: awardNames[awardType],
        player: player
    }).then(() => loadAwards());
}

// Initial Load
loadStandings();
loadPlayoffs();
loadAwards();