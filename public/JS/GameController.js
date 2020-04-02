document.querySelector('#next_btn').addEventListener('click', (e) => {
    const game_id = document.querySelector('#game_id');
    const word_id = document.querySelector('#word_id');
    const answer_label = document.querySelector('#answer_label');
    const answer_input = document.querySelector('#answer_input');

    fetch(`http://localhost:5000/api/games/update/${game_id.value}/word/${word_id.value}`, {
        headers: { "Content-Type": "application/json; charset=utf-8" },
        method: 'PUT',
        body: JSON.stringify({ answer: answer_input.value })
    }).then(response =>  {
        // console.log(response.json);
        return response.json()
    })
    .then((new_word) => {

        console.log(new_word);

        if (new_word.old_passed === false) {
            console.log('didnt pass');
        }
        
        answer_label.innerHTML = new_word.new_word.word.langOne;
        word_id.value = new_word.new_word.word._id;
        answer_input.value = '';
        answer_input.select();


    }).catch(() => window.location.href = `http://localhost:5000/games/results/${game_id.value}`);
});

document.querySelector('#answer_input').onkeyup = (e) => {
    if (e.keyCode === 13) {
        const next_btn = document.querySelector('#next_btn');
        next_btn.click();
    }
}

