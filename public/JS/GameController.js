
document.addEventListener('DOMContentLoaded', () => {
    const game_id = document.querySelector('#game_id').value;
    console.log('game loaded');
    fetch(`http://localhost:5000/api/games/${game_id}`)
    .then(function(response) {
        return response.json();
    })
    .then(function(myJson) {
        console.log(myJson);


        // send a make game request and make a game object and save the id in the next button

    });
});

document.querySelector('#next_btn').addEventListener('click', (e) => {
    const game_id = document.querySelector('#game_id').value;

    fetch(`http://localhost:5000/api/games/get_unpassed/${game_id}`)
    .then(function(response) {
        //return response.json();
    })
    .then(function(myJson) {
        //console.log(myJson);
    });
});

// on next word button click and do a 



