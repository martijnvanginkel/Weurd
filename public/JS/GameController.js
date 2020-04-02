document.querySelector('#next_btn').addEventListener('click', (e) => {
    const game_id = document.querySelector('#game_id');
    const word_id = document.querySelector('#word_id');
    const answer_label = document.querySelector('#answer_label');
    const answer_input = document.querySelector('#answer_input');

    fetch(`http://localhost:5000/api/games/update/${game_id.value}/word/${word_id.value}`, {
        headers: { "Content-Type": "application/json; charset=utf-8" },
        method: 'PUT',
        body: JSON.stringify({ answer: answer_input.value })
    }).then(response => {
        return response.json();
    })
    .then(new_word => {
        answer_label.innerHTML = new_word.word.langOne
        word_id.value = new_word.word._id;
    }).catch(() => {
        console.log('error');
    });
});
