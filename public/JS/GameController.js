class Game {
    constructor () {

    }
}




document.addEventListener('DOMContentLoaded', () => {
    const list_id = document.querySelector('#list_id').value;
    console.log('game loaded');
    fetch(`http://localhost:5000/api/games/${list_id}`)
    .then(function(response) {
        return response.json();
    })
    .then(function(myJson) {
        console.log(myJson);


        // send a make game request and make 

    });
});


// on next word button click 



