document.querySelector('#next_btn').addEventListener('click', (e) => {
    const game_id = document.querySelector('#game_id').value;
    const word_id = document.querySelector('#word_id').value;
    const answer_label = document.querySelector('#answer_label').innerHTML;
    const answer_input = document.querySelector('#answer_input').value;

    fetch(`http://localhost:5000/api/games/update/${game_id}/word/${word_id}`, {
        headers: { "Content-Type": "application/json; charset=utf-8" },
        method: 'PUT',
        body: JSON.stringify({ answer: answer_input })
    })
    .then(function(response) {
        return response.json();
    }).then(function(new_word) {
        console.log('response');
        console.log(new_word);
    });
});
